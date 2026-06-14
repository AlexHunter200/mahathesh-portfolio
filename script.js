// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileNavToggle.addEventListener('click', () => {
    mobileNavOverlay.classList.toggle('active');
    mobileNavToggle.classList.toggle('active');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        mobileNavToggle.classList.remove('active');
    });
});

// Position Node Interactions (Tactical Pitch)
const positionNodes = document.querySelectorAll('.position-node');
const positionData = {
    'LW': {
        title: 'Left Wing (LW)',
        badge: 'Primary Position',
        description: 'Naturally explosive on the left flank, utilizing pace and dribbling to cut inside on the right foot or provide dangerous crosses into the box.',
        attributes: [
            { name: 'Pace & Acceleration', value: 90 },
            { name: 'Dribbling & 1v1s', value: 85 },
            { name: 'Crossing & Creativity', value: 80 }
        ],
        coachNote: 'Highly effective in transitions and counter-attacks, capable of pulling opposition defenders out of position and opening space for central midfielders.'
    },
    'ST': {
        title: 'Striker (ST)',
        badge: 'Alternative Position',
        description: 'High attack threat with intelligent off-ball movement. Utilizes positioning to create space and threaten goal from close range.',
        attributes: [
            { name: 'Positioning & Movement', value: 87 },
            { name: 'Finishing & Power', value: 82 },
            { name: 'Heading & Aerial', value: 75 }
        ],
        coachNote: 'Effective as a false 9, dropping deep to link play while maintaining threat in box. High work rate pressing opposition defenders.'
    },
    'CF': {
        title: 'Centre Forward (CF)',
        badge: 'Alternative Position',
        description: 'Versatile central forward capable of leading the line or playing as support striker. Combines physical presence with technical skill.',
        attributes: [
            { name: 'Physical Presence', value: 84 },
            { name: 'Ball Control & Touch', value: 83 },
            { name: 'Attacking Positioning', value: 86 }
        ],
        coachNote: 'Can hold up play and bring teammates into attack. Strong press resistance and good decision-making in final third.'
    },
    'RW': {
        title: 'Right Wing (RW)',
        badge: 'Alternative Position',
        description: 'Tactical width on right flank with deep crossing runs. Capable of supporting defense and transitioning quickly to attack.',
        attributes: [
            { name: 'Speed & Acceleration', value: 89 },
            { name: 'Crossing & Vision', value: 78 },
            { name: 'Work Rate Defensive', value: 80 }
        ],
        coachNote: 'Strong in defensive transitions. Uses pace to recover position quickly and assist in defensive buildup. Overlapping with fullback.'
    },
    'CAM': {
        title: 'Centre Attacking Midfield (CAM)',
        badge: 'Midfield Position',
        description: 'Creative playmaker in advanced midfield. Focuses on chance creation, through ball accuracy, and intelligent positioning between lines.',
        attributes: [
            { name: 'Passing & Vision', value: 88 },
            { name: 'Positioning & Awareness', value: 85 },
            { name: 'Ball Control & Dribbling', value: 84 }
        ],
        coachNote: 'Key role linking midfield to attack. Responsible for dictating tempo and creating numerical advantages in attacking third. Excellent first touch.'
    },
    'CM': {
        title: 'Centre Midfield (CM)',
        badge: 'Midfield Position',
        description: 'Box-to-box midfielder balancing attack and defense. Provides defensive cover while pushing forward to support attacking plays.',
        attributes: [
            { name: 'Stamina & Work Rate', value: 88 },
            { name: 'Ball Recovery & Positioning', value: 81 },
            { name: 'Passing Accuracy', value: 82 }
        ],
        coachNote: 'Tireless runner covering significant distance. Strong ball retention and distribution under pressure. Key to team shape and balance.'
    },
    'RB': {
        title: 'Right Back (RB)',
        badge: 'Defensive Position',
        description: 'Energetic fullback with robust overlapping runs. Strong transitions and covering ability. Defensive positioning and awareness.',
        attributes: [
            { name: 'Pace & Acceleration', value: 87 },
            { name: 'Defensive Positioning', value: 79 },
            { name: 'Stamina & Recovery', value: 86 }
        ],
        coachNote: 'Provides attacking width in transition. Strong physical presence in 1v1 situations. Good crossing and overlapping technique.'
    }
};

positionNodes.forEach(node => {
    node.addEventListener('click', () => {
        // Remove active from all nodes
        positionNodes.forEach(n => n.classList.remove('active'));
        // Add active to clicked node
        node.classList.add('active');
        
        // Get position data
        const position = node.getAttribute('data-position');
        const data = positionData[position];
        
        // Update panel
        updatePositionPanel(data);
    });
});

function updatePositionPanel(data) {
    const titleEl = document.getElementById('pos-title');
    const badgeEl = document.getElementById('role-type-badge');
    const descEl = document.getElementById('pos-desc');
    const attributesEl = document.getElementById('pos-attributes');
    const coachNoteEl = document.getElementById('pos-coach-note');
    
    titleEl.textContent = data.title;
    badgeEl.textContent = data.badge;
    descEl.textContent = data.description;
    coachNoteEl.textContent = data.coachNote;
    
    // Clear and rebuild attributes
    attributesEl.innerHTML = '';
    data.attributes.forEach(attr => {
        const attrItem = document.createElement('div');
        attrItem.className = 'attr-item';
        attrItem.innerHTML = `
            <span class="attr-name">${attr.name}</span>
            <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: ${attr.value}%;"></div></div>
            <span class="attr-value">${attr.value}/100</span>
        `;
        attributesEl.appendChild(attrItem);
    });
}

// Mobile Menu Overlay Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
        mobileNavOverlay.classList.remove('active');
        mobileNavToggle.classList.remove('active');
    }
});

// Smooth scroll behavior for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#') {
            // Already handled by browser scroll-behavior: smooth
        }
    });
});

// Animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and honor items
const cards = document.querySelectorAll('.topps-card-container, .honor-card, .timeline-item');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// PDF Print Setup
const printButtons = document.querySelectorAll('.btn-print, .mobile-btn-print');
printButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        window.print();
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize first position as active
    const firstNode = document.querySelector('.position-node.natural.active');
    if (firstNode) {
        const position = firstNode.getAttribute('data-position');
        const data = positionData[position];
        updatePositionPanel(data);
    }
});