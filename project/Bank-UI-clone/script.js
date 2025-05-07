// Add interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Contact selection
    const contacts = document.querySelectorAll('.contact');
    contacts.forEach(contact => {
        contact.addEventListener('click', function() {
            contacts.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Transfer form submission
    const transferForm = document.querySelector('.transfer-form');
    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const fromAccount = document.getElementById('from').value;
        const note = document.getElementById('note').value;
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        // In a real app, you would send this data to your backend
        alert(`Transfer of $${amount} from ${fromAccount.split('(')[0]} initiated successfully!`);
        transferForm.reset();
    });

    // Card hover effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    notificationBell.addEventListener('click', function() {
        alert('You have 3 new notifications');
    });
});