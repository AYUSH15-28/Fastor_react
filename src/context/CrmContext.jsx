import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_COUNSELORS, INITIAL_ENQUIRIES, COURSES } from '../data/mockData';
import { playSound } from '../utils/audio';

const CrmContext = createContext();

const STORAGE_KEYS = {
  ENQUIRIES: 'fastor_crm_enquiries_v1',
  COUNSELORS: 'fastor_crm_counselors_v1',
  CURRENT_USER: 'fastor_crm_active_counselor_v1',
  THEME: 'fastor_crm_theme_v1',
  SOUND: 'fastor_crm_sound_v1'
};

export function CrmProvider({ children }) {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sound effects state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Counselors list
  const [counselors, setCounselors] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUNSELORS);
    return saved ? JSON.parse(saved) : INITIAL_COUNSELORS;
  });

  // Active counselor (associated with email ID)
  const [currentCounselor, setCurrentCounselor] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_COUNSELORS[0]; // Sarah Jenkins by default
  });

  // All enquiries
  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  // Active tab: 'public', 'my-leads', 'analytics', 'share-form'
  const [activeTab, setActiveTab] = useState('public');

  // Selected lead for detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync dark mode class on HTML root
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist enquiries
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  // Persist counselors
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUNSELORS, JSON.stringify(counselors));
  }, [counselors]);

  // Persist active counselor
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentCounselor));
  }, [currentCounselor]);

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Toast helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
    playSound('toggle', soundEnabled);
  };

  // Toggle Sound
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    playSound('toggle', !soundEnabled);
  };

  // Switch active counselor
  const switchCounselor = (counselor) => {
    setCurrentCounselor(counselor);
    playSound('click', soundEnabled);
    addToast('Account Switched', `Logged in as ${counselor.name} (${counselor.email})`, 'success');
  };

  // Login or Register custom counselor with email
  const loginCustomCounselor = (email, name = '', department = 'Admissions') => {
    const normalizedEmail = email.trim().toLowerCase();
    let existing = counselors.find(c => c.email.toLowerCase() === normalizedEmail);

    if (existing) {
      setCurrentCounselor(existing);
      addToast('Welcome Back', `Logged in as ${existing.name} (${existing.email})`, 'success');
    } else {
      const generatedName = name.trim() || normalizedEmail.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      const newCounselor = {
        id: 'c_' + Date.now(),
        name: generatedName,
        email: normalizedEmail,
        role: 'Counselor / Admissions Advisor',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
        department: department || 'General Admissions',
        phone: '+1 (555) 019-9281',
        status: 'online',
        claimedCount: 0,
        convertedCount: 0,
      };
      setCounselors(prev => [...prev, newCounselor]);
      setCurrentCounselor(newCounselor);
      addToast('New Counselor Created', `Account associated with ${normalizedEmail}`, 'success');
    }
    playSound('click', soundEnabled);
  };

  // DERIVED DATA:
  // 1. PUBLIC ENQUIRIES: Visible to ALL counselors when unclaimed
  const publicEnquiries = useMemo(() => {
    return enquiries.filter(enq => !enq.isClaimed);
  }, [enquiries]);

  // 2. MY ENQUIRIES: Private to currently logged-in counselor
  const myEnquiries = useMemo(() => {
    if (!currentCounselor?.email) return [];
    return enquiries.filter(
      enq => enq.isClaimed && enq.claimedBy?.toLowerCase() === currentCounselor.email.toLowerCase()
    );
  }, [enquiries, currentCounselor]);

  // 3. OTHER CLAIMED ENQUIRIES: Claimed by colleagues (hidden from public view, visible in analytics)
  const otherCounselorEnquiries = useMemo(() => {
    if (!currentCounselor?.email) return [];
    return enquiries.filter(
      enq => enq.isClaimed && enq.claimedBy?.toLowerCase() !== currentCounselor.email.toLowerCase()
    );
  }, [enquiries, currentCounselor]);

  // CLAIM AN ENQUIRY: Crucial business logic requirement #4
  // "Against each public enquiry, the employee/counselor has a choice to “Claim” it. Claiming it will
  // assign the enquiry to only this counselor inside the CRM & this enquiry will no longer be publically
  // visible to any other employee. We can say that this is now a private enquiry."
  const claimEnquiry = (enquiryId) => {
    const target = enquiries.find(e => e.id === enquiryId);
    if (!target) return;

    if (target.isClaimed) {
      addToast('Already Claimed', `This enquiry has already been claimed by ${target.claimedByName || target.claimedBy}`, 'warning');
      return;
    }

    const timestamp = new Date().toISOString();
    const counselorEmail = currentCounselor.email;
    const counselorName = currentCounselor.name;

    setEnquiries(prev => prev.map(e => {
      if (e.id === enquiryId) {
        return {
          ...e,
          isClaimed: true,
          claimedBy: counselorEmail,
          claimedByName: counselorName,
          claimedAt: timestamp,
          status: 'contacted', // moves to active discussion
          notes: [
            ...(e.notes || []),
            {
              id: 'n_' + Date.now(),
              text: `Enquiry claimed from Public Pool by ${counselorName} (${counselorEmail}). Assigned as private lead.`,
              author: counselorName,
              date: timestamp
            }
          ],
          timeline: [
            ...(e.timeline || []),
            {
              action: `Claimed by ${counselorName} (Now Private Lead)`,
              by: counselorName,
              date: timestamp,
              type: 'claim'
            }
          ]
        };
      }
      return e;
    }));

    // Update counselor statistics
    setCounselors(prev => prev.map(c => {
      if (c.email.toLowerCase() === counselorEmail.toLowerCase()) {
        return { ...c, claimedCount: (c.claimedCount || 0) + 1 };
      }
      return c;
    }));

    // If detail modal is open for this enquiry, update it
    setSelectedEnquiry(prev => {
      if (prev?.id === enquiryId) {
        return {
          ...prev,
          isClaimed: true,
          claimedBy: counselorEmail,
          claimedByName: counselorName,
          claimedAt: timestamp,
          status: 'contacted'
        };
      }
      return prev;
    });

    // Sensory celebration: confetti + audio chime
    playSound('claim', soundEnabled);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b']
      });
    } catch (e) {
      // ignore
    }

    addToast(
      '🎉 Lead Claimed Successfully!',
      `${target.name} has been assigned to your private CRM pipeline and removed from the public feed.`,
      'success'
    );
  };

  // RELEASE ENQUIRY BACK TO PUBLIC POOL
  const releaseEnquiry = (enquiryId) => {
    const target = enquiries.find(e => e.id === enquiryId);
    if (!target) return;

    const timestamp = new Date().toISOString();
    const counselorName = currentCounselor.name;

    setEnquiries(prev => prev.map(e => {
      if (e.id === enquiryId) {
        return {
          ...e,
          isClaimed: false,
          claimedBy: null,
          claimedByName: null,
          claimedAt: null,
          status: 'new',
          notes: [
            ...(e.notes || []),
            {
              id: 'n_' + Date.now(),
              text: `Lead released back to the Public Pool by ${counselorName}.`,
              author: counselorName,
              date: timestamp
            }
          ],
          timeline: [
            ...(e.timeline || []),
            {
              action: `Released back to Public Enquiries by ${counselorName}`,
              by: counselorName,
              date: timestamp,
              type: 'release'
            }
          ]
        };
      }
      return e;
    }));

    // Update counselor claimed count
    setCounselors(prev => prev.map(c => {
      if (c.email.toLowerCase() === currentCounselor.email.toLowerCase()) {
        return { ...c, claimedCount: Math.max(0, (c.claimedCount || 1) - 1) };
      }
      return c;
    }));

    if (selectedEnquiry?.id === enquiryId) {
      setSelectedEnquiry(null);
    }

    playSound('click', soundEnabled);
    addToast(
      'Enquiry Released',
      `${target.name} is now back in the Public Pool for all counselors to view.`,
      'info'
    );
  };

  // UPDATE LEAD STATUS
  const updateEnquiryStatus = (enquiryId, newStatus) => {
    const timestamp = new Date().toISOString();
    const counselorName = currentCounselor.name;

    setEnquiries(prev => prev.map(e => {
      if (e.id === enquiryId) {
        const isNowEnrolled = newStatus === 'enrolled';
        return {
          ...e,
          status: newStatus,
          timeline: [
            ...(e.timeline || []),
            {
              action: `Status updated to "${newStatus.toUpperCase()}"`,
              by: counselorName,
              date: timestamp,
              type: isNowEnrolled ? 'convert' : 'status'
            }
          ]
        };
      }
      return e;
    }));

    if (newStatus === 'enrolled') {
      // Converted lead celebration
      setCounselors(prev => prev.map(c => {
        if (c.email.toLowerCase() === currentCounselor.email.toLowerCase()) {
          return { ...c, convertedCount: (c.convertedCount || 0) + 1 };
        }
        return c;
      }));

      playSound('claim', soundEnabled);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      addToast('🏆 Student Enrolled!', 'Great job converting this lead!', 'success');
    } else {
      playSound('click', soundEnabled);
      addToast('Status Updated', `Lead status updated to ${newStatus}`, 'info');
    }
  };

  // ADD NOTE TO ENQUIRY
  const addEnquiryNote = (enquiryId, noteText) => {
    if (!noteText || !noteText.trim()) return;
    const timestamp = new Date().toISOString();
    const newNote = {
      id: 'n_' + Date.now(),
      text: noteText.trim(),
      author: currentCounselor.name,
      date: timestamp
    };

    setEnquiries(prev => prev.map(e => {
      if (e.id === enquiryId) {
        return {
          ...e,
          notes: [...(e.notes || []), newNote],
          timeline: [
            ...(e.timeline || []),
            {
              action: `Added follow-up note: "${noteText.trim().substring(0, 35)}..."`,
              by: currentCounselor.name,
              date: timestamp,
              type: 'note'
            }
          ]
        };
      }
      return e;
    }));

    if (selectedEnquiry?.id === enquiryId) {
      setSelectedEnquiry(prev => ({
        ...prev,
        notes: [...(prev.notes || []), newNote]
      }));
    }

    playSound('click', soundEnabled);
    addToast('Note Added', 'Follow-up log saved to lead profile', 'success');
  };

  // SUBMIT PUBLIC ENQUIRY FORM (By Prospective Client or by Counselor on Call)
  // Requirement #2: "There is an enquiry form which is provided to every prospective client to fill their basic details
  // i.e. Name, Email, Course interest etc. This form can be circulated online to capture leads or can
  // be shared by the counselor itself after it has connected with the student via call."
  const submitPublicEnquiry = (formData) => {
    const timestamp = new Date().toISOString();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `ENQ-${randomNum}`;

    const newEnquiry = {
      id: newId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || 'Not provided',
      courseInterest: formData.courseInterest,
      source: formData.source || 'Website Public Enquiry Form',
      urgency: formData.urgency || 'medium',
      experience: formData.experience || 'Not specified',
      preferredBatch: formData.preferredBatch || 'Flexible',
      message: formData.message.trim() || 'No additional message provided.',
      createdAt: timestamp,
      isClaimed: false,
      claimedBy: null,
      claimedByName: null,
      claimedAt: null,
      status: 'new',
      notes: [
        {
          id: 'n_initial',
          text: `Enquiry generated via ${formData.source || 'Public Web Form'}. Available in Public Pool.`,
          author: 'System Lead Capture',
          date: timestamp
        }
      ],
      timeline: [
        {
          action: 'Prospective Client Submitted Enquiry',
          by: formData.name.trim(),
          date: timestamp,
          type: 'submit'
        }
      ]
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    playSound('submit', soundEnabled);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (e) {}

    addToast(
      '🌟 Enquiry Submitted!',
      `Thank you ${newEnquiry.name}! Reference #${newId} is now live in the counselor pool.`,
      'success'
    );

    return newId;
  };

  // SIMULATE INCOMING RANDOM LEAD (Instant Live Demo feature)
  const simulateIncomingLead = () => {
    const sampleNames = [
      { name: 'Aditya Verma', email: 'aditya.verma@startup.in', phone: '+91 98112 33445', exp: 'Junior SDE' },
      { name: 'Chloe Dubois', email: 'chloe.d@creativeagency.fr', phone: '+33 6 12 34 56 78', exp: 'UI Designer' },
      { name: 'Siddharth Rao', email: 'sid.rao@cloudsys.com', phone: '+91 97223 44556', exp: 'Cloud Architect Aspirant' },
      { name: 'Elena Rostova', email: 'elena.rostova@datasphere.eu', phone: '+49 152 1234567', exp: 'Data Analyst' },
      { name: 'Vikram Sengupta', email: 'vikram.sen@techleads.io', phone: '+91 98334 55667', exp: 'Full Stack Engineer' }
    ];

    const randomPerson = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomCourse = COURSES[Math.floor(Math.random() * COURSES.length)].name;
    const urgencies = ['high', 'medium', 'high'];
    const urgency = urgencies[Math.floor(Math.random() * urgencies.length)];

    submitPublicEnquiry({
      name: randomPerson.name,
      email: `${randomPerson.email.split('@')[0]}_${Math.floor(Math.random()*900)}@${randomPerson.email.split('@')[1]}`,
      phone: randomPerson.phone,
      courseInterest: randomCourse,
      source: 'Website Public Enquiry Form',
      urgency: urgency,
      experience: randomPerson.exp,
      preferredBatch: 'Weekend Cohort',
      message: 'Looking for prompt assistance regarding syllabus, weekend batch timings, and placement support!'
    });
  };

  // RESET ALL DATA TO CLEAN INITIAL STATE
  const resetToDefaultData = () => {
    setEnquiries(INITIAL_ENQUIRIES);
    setCounselors(INITIAL_COUNSELORS);
    setCurrentCounselor(INITIAL_COUNSELORS[0]);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.COUNSELORS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    addToast('Data Reset', 'CRM reset to initial mock demo dataset.', 'info');
  };

  return (
    <CrmContext.Provider
      value={{
        darkMode,
        toggleTheme,
        soundEnabled,
        toggleSound,
        counselors,
        currentCounselor,
        switchCounselor,
        loginCustomCounselor,
        enquiries,
        publicEnquiries,
        myEnquiries,
        otherCounselorEnquiries,
        activeTab,
        setActiveTab,
        selectedEnquiry,
        setSelectedEnquiry,
        claimEnquiry,
        releaseEnquiry,
        updateEnquiryStatus,
        addEnquiryNote,
        submitPublicEnquiry,
        simulateIncomingLead,
        resetToDefaultData,
        toasts,
        addToast,
        removeToast,
        courses: COURSES
      }}
    >
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
}
