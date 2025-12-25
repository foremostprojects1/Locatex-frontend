// Injects the account sidebar menu into pages that include an element with id "accountSidebar"
(function() {
    function renderSidebar(container) {
        fetch('partials/account-sidebar.html')
            .then(function(res) { return res.text(); })
            .then(function(html) {
                container.innerHTML = html;

                // Highlight active link
                var path = window.location.pathname.split('/').pop();
                var active = container.querySelector('a[data-link="' + path + '"]');
                if (active) { active.classList.add('active'); }

                // Set avatar
                var user = {};
                try { user = JSON.parse(localStorage.getItem('current_user') || '{}'); } catch (e) {}
                var avatarEl = container.querySelector('#sidebarAvatarImg');
                if (avatarEl) {
                    avatarEl.src = (user && user.avatar) ? user.avatar : 'img/avatar/avatar-11.png';
                }

                // Logout - Now uses modal confirmation
                var logout = container.querySelector('#sidebarLogoutLink');
                if (logout) {
                    logout.addEventListener('click', function(e) {
                        e.preventDefault();
                        // Show logout confirmation modal
                        $('#logoutModal').modal('show');
                    });
                }
            })
            .catch(function(err) {
                console.error('Sidebar load failed', err);
                container.innerHTML = '';
            });
    }

    function init() {
        var sidebar = document.getElementById('accountSidebar');
        if (sidebar) { renderSidebar(sidebar); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


