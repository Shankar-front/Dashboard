document.addEventListener('DOMContentLoaded', function() {
    // Sample widget data
    const widgetsSets = {
        overview: [
            { id: 1, title: "Revenue Overview", type: "chart", data: { value: "$12,345", change: "+12%" } },
            { id: 2, title: "User Activity", type: "stats", data: { active: 1453, new: 32 } },
            { id: 3, title: "Recent Orders", type: "list", data: ["Order #1001", "Order #1002", "Order #1003"] },
            { id: 4, title: "Server Status", type: "status", data: { status: "Online", uptime: "99.9%" } }
        ],
        analytics: [
            { id: 5, title: "Traffic Analytics", type: "chart", data: { value: "4,230 visits", change: "+8%" } },
            { id: 6, title: "Conversion Rate", type: "stats", data: { rate: "3.2%", goal: "4.5%" } },
            { id: 7, title: "Top Pages", type: "list", data: ["Home (45%)", "Products (30%)", "About (15%)"] }
        ],
        reports: [
            { id: 8, title: "Monthly Report", type: "chart", data: { value: "July 2023", change: "+5% YoY" } },
            { id: 9, title: "KPIs", type: "stats", data: { metric1: "87%", metric2: "92%" } },
            { id: 10, title: "Issues Log", type: "list", data: ["Issue #1001", "Issue #1002", "Issue #1003"] }
        ],
        settings: [
            { id: 11, title: "User Preferences", type: "list", data: ["Theme: Dark", "Notifications: On", "Language: English"] },
            { id: 12, title: "Account Settings", type: "list", data: ["Change Password", "Two-Factor Auth", "Privacy Settings"] }
        ]
    };

    const widgetContainer = document.querySelector('.dashboard-widgets');
    const widgetTemplate = document.getElementById('widget-template');

    function createWidget(widgetData) {
        const widgetClone = widgetTemplate.content.cloneNode(true);
        const widget = widgetClone.querySelector('.widget');
        const title = widgetClone.querySelector('.widget-title');
        const content = widgetClone.querySelector('.widget-content');
        
        title.textContent = widgetData.title;
        
        switch(widgetData.type) {
            case 'chart':
                content.innerHTML = `
                    <div class="chart-placeholder">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7111eea8-4d02-4df0-a90b-2442be6c405e.png" 
                             alt="Line chart showing revenue growth over time with 12% increase"
                             style="width: 100%; height: auto;">
                        <div class="chart-details">
                            <span class="chart-value">${widgetData.data.value}</span>
                            <span class="chart-change ${widgetData.data.change.includes('+') ? 'positive' : 'negative'}">
                                ${widgetData.data.change}
                            </span>
                        </div>
                    </div>
                `;
                break;
            case 'stats':
                if (widgetData.data.active) {
                    content.innerHTML = `
                        <div class="stats-container">
                            <div class="stat-item">
                                <span class="stat-label">Active Users</span>
                                <span class="stat-value">${widgetData.data.active}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">New Today</span>
                                <span class="stat-value">${widgetData.data.new}</span>
                            </div>
                        </div>
                    `;
                } else {
                    content.innerHTML = `
                        <div class="stats-container">
                            <div class="stat-item">
                                <span class="stat-label">Primary KPI</span>
                                <span class="stat-value">${widgetData.data.metric1}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Secondary KPI</span>
                                <span class="stat-value">${widgetData.data.metric2}</span>
                            </div>
                        </div>
                    `;
                }
                break;
            case 'list':
                const listItems = widgetData.data.map(item => `<li>${item}</li>`).join('');
                content.innerHTML = `<ul class="data-list">${listItems}</ul>`;
                break;
            case 'status':
                content.innerHTML = `
                    <div class="status-indicator ${widgetData.data.status.toLowerCase()}">
                        <div class="status-circle"></div>
                        <span class="status-text">${widgetData.data.status}</span>
                    </div>
                    <div class="uptime">
                        Uptime: ${widgetData.data.uptime}
                    </div>
                `;
                break;
            case 'settings':
                content.innerHTML = `
                    <div class="settings-form">
                        <form>
                            ${widgetData.data.map(item => `
                            <div class="form-group">
                                <label>${item}</label>
                                <input type="text" placeholder="Configure setting">
                            </div>
                            `).join('')}
                        </form>
                    </div>
                `;
                break;
        }

        const removeBtn = widget.querySelector('.widget-remove');
        removeBtn.addEventListener('click', function() {
            widget.remove();
        });

        const refreshBtn = widget.querySelector('.widget-refresh');
        refreshBtn.addEventListener('click', function() {
            content.innerHTML = '<div class="loading-spinner">Refreshing...</div>';
            setTimeout(() => {
                createWidget(widgetData);
            }, 1000);
        });

        return widgetClone;
    }

    function loadTabWidgets(tabName) {
        widgetContainer.innerHTML = '';
        widgetsSets[tabName].forEach(widgetData => {
            const newWidget = createWidget(widgetData);
            widgetContainer.appendChild(newWidget);
        });
    }

    loadTabWidgets('overview');

    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.sidebar-nav li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentNode.classList.add('active');
            if (widgetsSets[tabName]) {
                loadTabWidgets(tabName);
            }
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });

    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    function toggleMenu() {
        sidebar.classList.toggle('active');
    }
    
    function closeMenu() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    }
    
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
            closeMenu();
        }
    });
});
