/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   ADMIN DASHBOARD — JAVASCRIPT
   SIDEBAR / HAMBURGER / EMAIL / AOS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById(
        "stacklyYouthAdminSidebar"
    );

    const menuToggle = document.getElementById(
        "stacklyYouthAdminMenuToggle"
    );

    const sidebarClose = document.getElementById(
        "stacklyYouthAdminSidebarClose"
    );

    const overlay = document.getElementById(
        "stacklyYouthAdminOverlay"
    );

    const adminEmail = document.getElementById(
        "stacklyYouthAdminEmail"
    );


    /* =====================================================
       AOS ANIMATION
    ====================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 850,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });

    }


    /* =====================================================
       SIDEBAR OPEN
    ====================================================== */

    function openAdminSidebar() {

        if (!sidebar) return;

        sidebar.classList.add(
            "stackly-youth-admin-sidebar-open"
        );

        if (overlay) {

            overlay.classList.add(
                "stackly-youth-admin-overlay-active"
            );

        }

        document.body.classList.add(
            "stackly-youth-admin-menu-active"
        );

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    /* =====================================================
       SIDEBAR CLOSE
    ====================================================== */

    function closeAdminSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove(
            "stackly-youth-admin-sidebar-open"
        );

        if (overlay) {

            overlay.classList.remove(
                "stackly-youth-admin-overlay-active"
            );

        }

        document.body.classList.remove(
            "stackly-youth-admin-menu-active"
        );

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =====================================================
       HAMBURGER BUTTON
       Opens / closes mobile sidebar
    ====================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (
                    sidebar &&
                    sidebar.classList.contains(
                        "stackly-youth-admin-sidebar-open"
                    )
                ) {

                    closeAdminSidebar();

                } else {

                    openAdminSidebar();

                }

            }
        );

    }


    /* =====================================================
       X CLOSE BUTTON
    ====================================================== */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeAdminSidebar();

            }
        );

    }


    /* =====================================================
       OVERLAY CLOSE
    ====================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeAdminSidebar();

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (
                    sidebar &&
                    sidebar.classList.contains(
                        "stackly-youth-admin-sidebar-open"
                    )
                ) {

                    closeAdminSidebar();

                }

            }

        }
    );


    /* =====================================================
       CLOSE SIDEBAR AFTER NAVIGATION
    ====================================================== */

    const navigationLinks = document.querySelectorAll(
        ".stackly-youth-admin-nav-link"
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeAdminSidebar();

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navigationLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (!linkPage) return;

        const cleanLinkPage =
            linkPage
                .split("/")
                .pop()
                .toLowerCase();

        link.classList.remove("active");

        if (
            cleanLinkPage === currentPage ||
            (
                currentPage === "" &&
                cleanLinkPage === "admin.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       ADMIN EMAIL
       
       Gets the logged-in email from localStorage.
    ====================================================== */

    const storedEmail =
        localStorage.getItem(
            "stacklyYouthLoginEmail"
        );


    if (adminEmail) {

        if (
            storedEmail &&
            storedEmail.trim() !== ""
        ) {

            adminEmail.textContent =
                storedEmail.trim();

        } else {

            adminEmail.textContent =
                "admin@stacklyyouth.org";

        }

    }


    /* =====================================================
       PROFILE EMAIL TOOLTIP
    ====================================================== */

    const profile =
        document.querySelector(
            ".stackly-youth-admin-profile"
        );


    if (
        profile &&
        adminEmail
    ) {

        profile.setAttribute(
            "title",
            adminEmail.textContent.trim()
        );

    }


    /* =====================================================
       BODY SCROLL CONTROL
       
       Prevents the page from scrolling while the
       mobile sidebar is open.
    ====================================================== */

    function updateBodyScroll() {

        if (
            sidebar &&
            sidebar.classList.contains(
                "stackly-youth-admin-sidebar-open"
            )
        ) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

    }


    /* =====================================================
       SIDEBAR CLASS OBSERVER
    ====================================================== */

    if (sidebar) {

        const sidebarObserver =
            new MutationObserver(function () {

                updateBodyScroll();

            });


        sidebarObserver.observe(
            sidebar,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }


    /* =====================================================
       RESPONSIVE RESET
       
       When switching from mobile to desktop,
       automatically close the mobile sidebar.
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 991) {

                closeAdminSidebar();

            }

        }
    );


    /* =====================================================
       INITIAL SIDEBAR STATE
    ====================================================== */

    if (sidebar) {

        sidebar.classList.remove(
            "stackly-youth-admin-sidebar-open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "stackly-youth-admin-overlay-active"
        );

    }


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       LOGOUT
    ====================================================== */

    const logoutLink =
        document.querySelector(
            ".stackly-youth-admin-logout"
        );


    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "stacklyYouthLoginEmail"
                );

                localStorage.removeItem(
                    "stacklyYouthLoginRole"
                );

                localStorage.removeItem(
                    "stacklyYouthLoggedIn"
                );

                localStorage.removeItem(
                    "stacklyYouthRemember"
                );

            }
        );

    }


    /* =====================================================
       SIDEBAR BRAND
    ====================================================== */

    const adminBrand =
        document.querySelector(
            ".stackly-youth-admin-brand"
        );


    if (adminBrand) {

        adminBrand.addEventListener(
            "click",
            function () {

                closeAdminSidebar();

            }
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ====================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    if (
                        sidebar &&
                        sidebar.classList.contains(
                            "stackly-youth-admin-sidebar-open"
                        )
                    ) {

                        closeAdminSidebar();

                    } else {

                        openAdminSidebar();

                    }

                }

            }
        );

    }


    /* =====================================================
       FINAL INITIALIZATION
    ====================================================== */

    updateBodyScroll();

});

/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   ADMIN DONATION ANALYTICS
   - Custom Period Dropdown
   - Dynamic Donation Chart
   - Animated Chart Bars
   - Active Month Highlight
   - Chart Summary Updates
   - Outside Click
   - ESC Close
   - Keyboard Support
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const dropdown =
        document.getElementById(
            "stacklyYouthDonationPeriodDropdown"
        );

    const trigger =
        document.getElementById(
            "stacklyYouthDonationPeriodTrigger"
        );

    const menu =
        document.getElementById(
            "stacklyYouthDonationPeriodMenu"
        );

    const selectedText =
        document.getElementById(
            "stacklyYouthDonationPeriodText"
        );

    const options =
        dropdown
            ? dropdown.querySelectorAll(
                ".stackly-youth-admin-donation-dropdown-option"
            )
            : [];

    const chartBars =
        document.querySelector(
            ".stackly-youth-admin-donation-bars"
        );

    const chartFooter =
        document.querySelector(
            ".stackly-youth-admin-donation-chart-footer"
        );


    /* =====================================================
       DONATION DATA
    ===================================================== */

    const donationData = {

        "7-months": {
            label: "Last 7 Months",

            months: [
                { month: "Apr", value: 42 },
                { month: "May", value: 56 },
                { month: "Jun", value: 48 },
                { month: "Jul", value: 71 },
                { month: "Aug", value: 64 },
                { month: "Sep", value: 82 },
                { month: "Oct", value: 92 }
            ],

            average: "₹6,96,120",
            highest: "October"
        },


        "12-months": {
            label: "Last 12 Months",

            months: [
                { month: "Nov", value: 38 },
                { month: "Dec", value: 52 },
                { month: "Jan", value: 46 },
                { month: "Feb", value: 61 },
                { month: "Mar", value: 55 },
                { month: "Apr", value: 42 },
                { month: "May", value: 56 },
                { month: "Jun", value: 48 },
                { month: "Jul", value: 71 },
                { month: "Aug", value: 64 },
                { month: "Sep", value: 82 },
                { month: "Oct", value: 92 }
            ],

            average: "₹6,42,850",
            highest: "October"
        },


        "this-year": {
            label: "This Year",

            months: [
                { month: "Jan", value: 46 },
                { month: "Feb", value: 61 },
                { month: "Mar", value: 55 },
                { month: "Apr", value: 42 },
                { month: "May", value: 56 },
                { month: "Jun", value: 48 },
                { month: "Jul", value: 71 },
                { month: "Aug", value: 64 },
                { month: "Sep", value: 82 }
            ],

            average: "₹6,38,450",
            highest: "September"
        }

    };


    /* =====================================================
       DROPDOWN OPEN / CLOSE
    ===================================================== */

    function openDonationDropdown() {

        if (!dropdown || !trigger) return;

        dropdown.classList.add("open");

        trigger.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    function closeDonationDropdown() {

        if (!dropdown || !trigger) return;

        dropdown.classList.remove("open");

        trigger.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleDonationDropdown() {

        if (!dropdown) return;

        const isOpen =
            dropdown.classList.contains("open");

        if (isOpen) {
            closeDonationDropdown();
        } else {
            openDonationDropdown();
        }
    }


    /* =====================================================
       UPDATE CHART
    ===================================================== */

    function updateDonationChart(period) {

        if (!chartBars) return;

        const selectedData =
            donationData[period];

        if (!selectedData) return;


        /* -----------------------------------------------
           Clear Existing Bars
        ------------------------------------------------ */

        chartBars.innerHTML = "";


        /* -----------------------------------------------
           Find Highest Value
        ------------------------------------------------ */

        const highestValue =
            Math.max(
                ...selectedData.months.map(
                    item => item.value
                )
            );


        /* -----------------------------------------------
           Create New Bars
        ------------------------------------------------ */

        selectedData.months.forEach(function (item) {

            const column =
                document.createElement("div");

            column.className =
                "donation-bar-column";


            const bar =
                document.createElement("div");

            bar.className =
                "donation-bar";


            bar.style.height =
                "0%";


            const month =
                document.createElement("span");

            month.textContent =
                item.month;


            /* -------------------------------------------
               Highlight Highest Month
            -------------------------------------------- */

            if (item.value === highestValue) {

                column.classList.add("active");

            }


            column.appendChild(bar);

            column.appendChild(month);

            chartBars.appendChild(column);


            /* -------------------------------------------
               Animate Bar
            -------------------------------------------- */

            requestAnimationFrame(function () {

                setTimeout(function () {

                    bar.style.height =
                        item.value + "%";

                }, 80);

            });

        });


        /* =================================================
           UPDATE FOOTER
        ================================================== */

        if (chartFooter) {

            const footerItems =
                chartFooter.querySelectorAll("div");

            if (footerItems.length >= 2) {

                const averageValue =
                    footerItems[0].querySelector("strong");

                const highestMonth =
                    footerItems[1].querySelector("strong");


                if (averageValue) {

                    averageValue.textContent =
                        selectedData.average;

                }


                if (highestMonth) {

                    highestMonth.textContent =
                        selectedData.highest;

                }

            }

        }

    }


    /* =====================================================
       DROPDOWN OPTION SELECTION
    ===================================================== */

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                const value =
                    option.dataset.value;

                const data =
                    donationData[value];

                if (!data) return;


                /* ---------------------------------------
                   Update Trigger Text
                ---------------------------------------- */

                selectedText.textContent =
                    data.label;


                /* ---------------------------------------
                   Update Active State
                ---------------------------------------- */

                options.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                        item.setAttribute(
                            "aria-selected",
                            "false"
                        );

                    }
                );


                option.classList.add(
                    "active"
                );

                option.setAttribute(
                    "aria-selected",
                    "true"
                );


                /* ---------------------------------------
                   Close Dropdown
                ---------------------------------------- */

                closeDonationDropdown();


                /* ---------------------------------------
                   Update Chart
                ---------------------------------------- */

                updateDonationChart(value);

            }
        );

    });


    /* =====================================================
       TRIGGER CLICK
    ===================================================== */

    if (trigger) {

        trigger.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleDonationDropdown();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE DROPDOWN
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                dropdown &&
                !dropdown.contains(event.target)
            ) {

                closeDonationDropdown();

            }

        }
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeDonationDropdown();

            }

        }
    );


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    if (trigger) {

        trigger.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "ArrowDown" ||
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openDonationDropdown();

                    if (options.length) {

                        options[0].focus();

                    }

                }

            }
        );

    }


    options.forEach(
        function (option, index) {

            option.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "ArrowDown") {

                        event.preventDefault();

                        const next =
                            options[index + 1];

                        if (next) {

                            next.focus();

                        }

                    }


                    if (event.key === "ArrowUp") {

                        event.preventDefault();

                        const previous =
                            options[index - 1];

                        if (previous) {

                            previous.focus();

                        } else if (trigger) {

                            trigger.focus();

                        }

                    }


                    if (event.key === "Enter") {

                        event.preventDefault();

                        option.click();

                    }

                }
            );

        }
    );


    /* =====================================================
       INITIAL CHART
    ===================================================== */

    updateDonationChart("7-months");


    /* =====================================================
       PROFESSIONAL BAR HOVER INFORMATION
    ===================================================== */

    if (chartBars) {

        chartBars.addEventListener(
            "mouseover",
            function (event) {

                const bar =
                    event.target.closest(
                        ".donation-bar"
                    );

                if (!bar) return;


                const column =
                    bar.closest(
                        ".donation-bar-column"
                    );

                if (!column) return;


                const month =
                    column.querySelector(
                        "span"
                    );


                if (month) {

                    bar.setAttribute(
                        "title",
                        month.textContent +
                        " donation activity"
                    );

                }

            }
        );

    }


    /* =====================================================
       SOURCE ITEM INTERACTION
    ===================================================== */

    const sourceItems =
        document.querySelectorAll(
            ".stackly-youth-admin-donation-source-item"
        );


    sourceItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    sourceItems.forEach(
                        function (source) {

                            source.classList.remove(
                                "source-selected"
                            );

                        }
                    );


                    item.classList.add(
                        "source-selected"
                    );

                }
            );

        }
    );


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    if (menu) {

        menu.setAttribute(
            "aria-label",
            "Donation period options"
        );

    }


    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "stackly-youth-reduced-motion"
        );

    }


    reducedMotion.addEventListener(
        "change",
        function (event) {

            if (event.matches) {

                document.documentElement.classList.add(
                    "stackly-youth-reduced-motion"
                );

            } else {

                document.documentElement.classList.remove(
                    "stackly-youth-reduced-motion"
                );

            }

        }
    );

});


/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   ADMIN MESSAGES PAGE
   MESSAGE WORKSPACE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const messageWorkspace =
        document.querySelector(".stackly-youth-admin-message-workspace");

    if (!messageWorkspace) return;

    const messageFilters =
        messageWorkspace.querySelectorAll(
            ".stackly-youth-admin-message-filter"
        );

    const messageItems =
        messageWorkspace.querySelectorAll(
            ".stackly-youth-admin-message-item"
        );

    const messageList =
        messageWorkspace.querySelector(".stackly-youth-admin-message-list");


    /* =====================================================
       FILTER MESSAGES
    ====================================================== */

    messageFilters.forEach((filterButton) => {

        filterButton.addEventListener("click", () => {

            /* Remove active state */
            messageFilters.forEach((button) => {
                button.classList.remove("active");
                button.setAttribute("aria-selected", "false");
            });

            /* Add active state */
            filterButton.classList.add("active");
            filterButton.setAttribute("aria-selected", "true");


            const filterText =
                filterButton.textContent
                    .trim()
                    .toLowerCase()
                    .replace(/[0-9]/g, "")
                    .trim();


            /* Filter messages */
            messageItems.forEach((message, index) => {

                let shouldShow = true;

                if (filterText === "unread") {
                    shouldShow =
                        message.classList.contains("unread");
                }

                else if (filterText === "priority") {
                    shouldShow =
                        message.classList.contains("priority");
                }

                else if (filterText === "volunteers") {
                    shouldShow =
                        message.querySelector(
                            ".stackly-youth-admin-message-top span"
                        )?.textContent
                            .trim()
                            .toLowerCase() === "volunteer";
                }

                else if (filterText === "donors") {
                    shouldShow =
                        message.querySelector(
                            ".stackly-youth-admin-message-top span"
                        )?.textContent
                            .trim()
                            .toLowerCase() === "donor";
                }

                else if (filterText === "all messages") {
                    shouldShow = true;
                }


                if (shouldShow) {

                    message.style.display = "grid";

                    message.style.animation =
                        "stacklyYouthMessageFilterIn 0.35s ease forwards";

                    message.setAttribute("aria-hidden", "false");

                } else {

                    message.style.display = "none";

                    message.setAttribute("aria-hidden", "true");
                }

            });


            updateVisibleMessageCount();

        });

    });


    /* =====================================================
       INITIAL ACCESSIBILITY STATE
    ====================================================== */

    messageFilters.forEach((button, index) => {

        button.setAttribute(
            "aria-selected",
            index === 0 ? "true" : "false"
        );

        button.setAttribute(
            "role",
            "tab"
        );

    });


    /* =====================================================
       UPDATE MESSAGE COUNT
    ====================================================== */

    function updateVisibleMessageCount() {

        const visibleMessages =
            Array.from(messageItems).filter((message) => {
                return message.style.display !== "none";
            });

        const workspaceHeader =
            messageWorkspace.querySelector(
                ".stackly-youth-admin-message-workspace-header h3"
            );

        if (workspaceHeader) {

            const originalTitle = "Message Center";

            workspaceHeader.textContent =
                `${originalTitle} (${visibleMessages.length})`;

        }

    }


    /* =====================================================
       MESSAGE ITEM HOVER INTERACTION
    ====================================================== */

    messageItems.forEach((message) => {

        message.addEventListener("mouseenter", () => {

            message.classList.add(
                "stackly-youth-admin-message-item-hover"
            );

        });


        message.addEventListener("mouseleave", () => {

            message.classList.remove(
                "stackly-youth-admin-message-item-hover"
            );

        });

    });


    /* =====================================================
       MARK UNREAD MESSAGE AS READ
    ====================================================== */

    messageItems.forEach((message) => {

        message.addEventListener("click", (event) => {

            /*
             * Do not mark as read when clicking
             * an actual action link.
             */
            if (
                event.target.closest(
                    ".stackly-youth-admin-message-actions a"
                )
            ) {
                return;
            }


            if (message.classList.contains("unread")) {

                message.classList.remove("unread");

                message.classList.add(
                    "stackly-youth-admin-message-read"
                );


                /*
                 * Update unread filter count
                 */
                updateUnreadCount();

            }

        });

    });


    /* =====================================================
       UPDATE UNREAD COUNT
    ====================================================== */

    function updateUnreadCount() {

        const unreadMessages =
            messageWorkspace.querySelectorAll(
                ".stackly-youth-admin-message-item.unread"
            ).length;


        messageFilters.forEach((button) => {

            const buttonText =
                button.childNodes[0]?.textContent
                    ?.trim()
                    .toLowerCase();

            if (buttonText === "unread") {

                const count =
                    button.querySelector("span");

                if (count) {
                    count.textContent = unreadMessages;
                }

            }

        });

    }


    /* =====================================================
       ACTION BUTTON MICRO INTERACTION
    ====================================================== */

    const actionLinks =
        messageWorkspace.querySelectorAll(
            ".stackly-youth-admin-message-actions a"
        );


    actionLinks.forEach((action) => {

        action.addEventListener("mouseenter", () => {

            action.classList.add(
                "stackly-youth-admin-message-action-hover"
            );

        });


        action.addEventListener("mouseleave", () => {

            action.classList.remove(
                "stackly-youth-admin-message-action-hover"
            );

        });

    });


    /* =====================================================
       KEYBOARD NAVIGATION
    ====================================================== */

    messageFilters.forEach((button, index) => {

        button.addEventListener("keydown", (event) => {

            let nextIndex = null;


            if (event.key === "ArrowRight") {

                nextIndex =
                    (index + 1) % messageFilters.length;

            }


            if (event.key === "ArrowLeft") {

                nextIndex =
                    (index - 1 + messageFilters.length) %
                    messageFilters.length;

            }


            if (nextIndex !== null) {

                event.preventDefault();

                messageFilters[nextIndex].focus();

                messageFilters[nextIndex].click();

            }

        });

    });


    /* =====================================================
       ESCAPE KEY
       ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            const activeFilter =
                messageWorkspace.querySelector(
                    ".stackly-youth-admin-message-filter.active"
                );

            if (activeFilter) {
                activeFilter.blur();
            }

        }

    });


    /* =====================================================
       TOUCH FEEDBACK
    ====================================================== */

    messageItems.forEach((message) => {

        message.addEventListener(
            "touchstart",
            () => {

                message.classList.add(
                    "stackly-youth-admin-message-touch"
                );

            },
            { passive: true }
        );


        message.addEventListener(
            "touchend",
            () => {

                setTimeout(() => {

                    message.classList.remove(
                        "stackly-youth-admin-message-touch"
                    );

                }, 180);

            },
            { passive: true }
        );

    });


    /* =====================================================
       MESSAGE LIST EMPTY STATE
    ====================================================== */

    function checkEmptyState() {

        if (!messageList) return;

        const visibleMessages =
            Array.from(messageItems).some((message) => {
                return message.style.display !== "none";
            });


        let emptyMessage =
            messageList.querySelector(
                ".stackly-youth-admin-message-empty"
            );


        if (!visibleMessages) {

            if (!emptyMessage) {

                emptyMessage =
                    document.createElement("div");

                emptyMessage.className =
                    "stackly-youth-admin-message-empty";

                emptyMessage.innerHTML = `
                    <div class="stackly-youth-admin-message-empty-icon">
                        <i class="fa-regular fa-envelope-open"></i>
                    </div>

                    <h4>No messages found</h4>

                    <p>
                        There are no conversations matching
                        the selected filter.
                    </p>
                `;

                messageList.appendChild(emptyMessage);

            }

        } else if (emptyMessage) {

            emptyMessage.remove();

        }

    }


    /* =====================================================
       PATCH FILTER FUNCTION FOR EMPTY STATE
    ====================================================== */

    messageFilters.forEach((filterButton) => {

        filterButton.addEventListener("click", () => {

            setTimeout(() => {
                checkEmptyState();
            }, 20);

        });

    });


    /* =====================================================
       INITIALIZE
    ====================================================== */

    messageItems.forEach((message) => {

        message.style.transition =
            "transform .3s ease, box-shadow .3s ease, border-color .3s ease";

    });


    updateUnreadCount();

});


/* =========================================================
   STACKLY YOUTH — DYNAMIC ADMIN USER NAME
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const userNameElement = document.getElementById(
        "stacklyYouthAdminUserName"
    );

    const userEmailElement = document.getElementById(
        "stacklyYouthAdminUserEmail"
    );

    // Get the email saved during login
    const userEmail = localStorage.getItem(
        "stacklyYouthLoginEmail"
    );

    if (userEmail) {

        // Display the logged-in email
        if (userEmailElement) {
            userEmailElement.textContent = userEmail;
        }

        // Get the first word from the email username
        const emailUsername = userEmail
            .split("@")[0]
            .split(/[._+-]/)[0];

        // Capitalize the first letter
        const formattedName = emailUsername
            ? emailUsername.charAt(0).toUpperCase() +
              emailUsername.slice(1).toLowerCase()
            : "Admin";

        // Update the h4
        if (userNameElement) {
            userNameElement.textContent = formattedName;
        }
    }

});

/* =========================================================
   STACKLY YOUTH — ADMIN PROFILE SETTINGS
   Load, Edit and Save Name + Email
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const fullNameInput = document.getElementById(
        "stacklyYouthAdminFullName"
    );

    const emailInput = document.getElementById(
        "stacklyYouthAdminEmailSetting"
    );

    const saveButton = document.getElementById(
        "stacklyYouthAdminProfileSave"
    );

    const messageElement = document.getElementById(
        "stacklyYouthAdminProfileMessage"
    );

    const LOGIN_EMAIL_KEY = "stacklyYouthLoginEmail";
    const USERS_KEY = "stacklyYouthUsers";

    if (!fullNameInput || !emailInput || !saveButton) {
        return;
    }

    /* =====================================================
       LOAD CURRENT USER
    ====================================================== */

    let currentEmail = (
        localStorage.getItem(LOGIN_EMAIL_KEY) || ""
    ).trim().toLowerCase();

    let currentUser = null;

    function getUsers() {
        try {
            const users = JSON.parse(
                localStorage.getItem(USERS_KEY) || "[]"
            );

            return Array.isArray(users) ? users : [];
        } catch (error) {
            console.error("Unable to read user data:", error);
            return [];
        }
    }

    let users = getUsers();

    currentUser = users.find(function (user) {
        return user.email &&
            user.email.trim().toLowerCase() === currentEmail;
    });

    /* =====================================================
       DISPLAY USER DETAILS
    ====================================================== */

    function getNameFromEmail(email) {
        const username = email.split("@")[0] || "Admin";

        const firstName = username
            .split(/[._+-]/)[0]
            .replace(/[^a-zA-Z]/g, "");

        if (!firstName) return "Admin";

        return firstName.charAt(0).toUpperCase() +
            firstName.slice(1).toLowerCase();
    }

    if (currentUser) {
        fullNameInput.value =
            currentUser.name || getNameFromEmail(currentEmail);
    } else {
        fullNameInput.value = getNameFromEmail(currentEmail);
    }

    emailInput.value = currentEmail;

    /* =====================================================
       SHOW STATUS MESSAGE
    ====================================================== */

    function showProfileMessage(message, type) {
        if (!messageElement) return;

        messageElement.textContent = message;
        messageElement.className =
            "stackly-youth-admin-profile-message " + type;
    }

    /* =====================================================
       VALIDATE EMAIL
    ====================================================== */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    /* =====================================================
       SAVE PROFILE DETAILS
    ====================================================== */

    saveButton.addEventListener("click", function () {

        const updatedName = fullNameInput.value.trim();
        const updatedEmail = emailInput.value.trim().toLowerCase();

        if (!updatedName) {
            showProfileMessage(
                "Please enter your full name.",
                "error"
            );
            fullNameInput.focus();
            return;
        }

        if (!isValidEmail(updatedEmail)) {
            showProfileMessage(
                "Please enter a valid email address.",
                "error"
            );
            emailInput.focus();
            return;
        }

        users = getUsers();

        const oldEmail = currentEmail;

        const matchingUserIndex = users.findIndex(function (user) {
            return user.email &&
                user.email.trim().toLowerCase() === oldEmail;
        });

        /* Prevent duplicate email addresses */
        const duplicateUser = users.find(function (user) {
            return user.email &&
                user.email.trim().toLowerCase() === updatedEmail &&
                user.email.trim().toLowerCase() !== oldEmail;
        });

        if (duplicateUser) {
            showProfileMessage(
                "This email address is already registered.",
                "error"
            );
            emailInput.focus();
            return;
        }

        try {
            /* Update existing registered account */
            if (matchingUserIndex !== -1) {
                users[matchingUserIndex].name = updatedName;
                users[matchingUserIndex].email = updatedEmail;

                localStorage.setItem(
                    USERS_KEY,
                    JSON.stringify(users)
                );
            }

            /* Update active login email */
            localStorage.setItem(
                LOGIN_EMAIL_KEY,
                updatedEmail
            );

            /* Update current profile state */
            currentEmail = updatedEmail;

            if (matchingUserIndex !== -1) {
                currentUser = users[matchingUserIndex];
            }

            /* Update visible admin profile if present */
            const sidebarName = document.getElementById(
                "stacklyYouthAdminUserName"
            );

            const sidebarEmail = document.getElementById(
                "stacklyYouthAdminUserEmail"
            );

            if (sidebarName) {
                sidebarName.textContent = updatedName;
            }

            if (sidebarEmail) {
                sidebarEmail.textContent = updatedEmail;
            }

            showProfileMessage(
                "Profile details saved successfully.",
                "success"
            );

        } catch (error) {
            console.error("Unable to save profile:", error);

            showProfileMessage(
                "Unable to save changes. Please try again.",
                "error"
            );
        }
    });

    /* =====================================================
       CLEAR MESSAGE WHEN EDITING
    ====================================================== */

    [fullNameInput, emailInput].forEach(function (input) {
        input.addEventListener("input", function () {
            if (messageElement) {
                messageElement.textContent = "";
                messageElement.className =
                    "stackly-youth-admin-profile-message";
            }
        });
    });

});


/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   ADMIN SETTINGS — PROFESSIONAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const settingsRoot = document.getElementById(
        "stacklyYouthAdminSettings"
    );

    if (!settingsRoot) return;

    const settingsTabs = settingsRoot.querySelectorAll(
        "[data-settings-tab]"
    );

    const settingsPanels = settingsRoot.querySelectorAll(
        "[data-settings-panel]"
    );

    const profileName = document.getElementById(
        "stacklyYouthAdminFullName"
    );

    const profileEmail = document.getElementById(
        "stacklyYouthAdminEmailSetting"
    );

    const profilePhone = document.getElementById(
        "stacklyYouthAdminPhone"
    );

    const profileDisplayName = document.getElementById(
        "stacklyYouthAdminUserName"
    );

    const profileDisplayEmail = document.getElementById(
        "stacklyYouthAdminUserEmail"
    );

    const profileSaveButton = document.getElementById(
        "stacklyYouthAdminProfileSave"
    );

    const profileMessage = document.getElementById(
        "stacklyYouthAdminProfileMessage"
    );

    const USERS_KEY = "stacklyYouthUsers";
    const LOGIN_EMAIL_KEY = "stacklyYouthLoginEmail";

    const FOUNDATION_KEY = "stacklyYouthFoundationSettings";
    const NOTIFICATION_KEY = "stacklyYouthNotificationSettings";
    const DISPLAY_KEY = "stacklyYouthDisplaySettings";
    const THEME_KEY = "stacklyYouthAdminTheme";

    /* =====================================================
       SAFE LOCAL STORAGE HELPERS
    ====================================================== */

    function readStorage(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch (error) {
            console.warn("Unable to read setting:", key, error);
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Unable to save setting:", key, error);
            return false;
        }
    }

    function getUsers() {
        const users = readStorage(USERS_KEY, []);
        return Array.isArray(users) ? users : [];
    }

    /* =====================================================
       EMAIL AND NAME HELPERS
    ====================================================== */

    function normalizeEmail(email) {
        return (email || "").trim().toLowerCase();
    }

    function getNameFromEmail(email) {
        const username = normalizeEmail(email).split("@")[0] || "";
        const firstPart = username.split(/[._+-]/)[0];
        const cleaned = firstPart.replace(/[^a-zA-Z]/g, "");

        if (!cleaned) return "Administrator";

        return cleaned.charAt(0).toUpperCase() +
            cleaned.slice(1).toLowerCase();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    /* =====================================================
       SETTINGS STATUS MESSAGE
    ====================================================== */

    function showProfileMessage(message, type = "success") {
        if (!profileMessage) return;

        profileMessage.textContent = message;
        profileMessage.className =
            "stackly-youth-admin-profile-message " + type;
    }

    function clearProfileMessage() {
        if (!profileMessage) return;

        profileMessage.textContent = "";
        profileMessage.className =
            "stackly-youth-admin-profile-message";
    }

    /* =====================================================
       SETTINGS TAB NAVIGATION
    ====================================================== */

    function activateSettingsTab(tabName, moveFocus = false) {
        let matchingTab = null;
        let matchingPanel = null;

        settingsTabs.forEach(function (tab) {
            const isActive =
                tab.dataset.settingsTab === tabName;

            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
            tab.setAttribute("role", "tab");

            if (isActive) matchingTab = tab;
        });

        settingsPanels.forEach(function (panel) {
            const isActive =
                panel.dataset.settingsPanel === tabName;

            panel.classList.toggle("active", isActive);
            panel.hidden = !isActive;
            panel.setAttribute("role", "tabpanel");

            if (isActive) matchingPanel = panel;
        });

        if (matchingTab) {
            settingsTabs.forEach(function (tab) {
                tab.setAttribute(
                    "tabindex",
                    tab === matchingTab ? "0" : "-1"
                );
            });

            if (moveFocus) matchingTab.focus();
        }

        if (matchingPanel) {
            matchingPanel.setAttribute(
                "aria-label",
                matchingTab
                    ? matchingTab.textContent.trim()
                    : "Settings panel"
            );
        }

        try {
            localStorage.setItem(
                "stacklyYouthActiveSettingsTab",
                tabName
            );
        } catch (error) {
            console.warn("Unable to remember active settings tab.");
        }
    }

    settingsTabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            activateSettingsTab(tab.dataset.settingsTab);
        });

        tab.addEventListener("keydown", function (event) {
            let nextIndex = index;

            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                nextIndex = (index + 1) % settingsTabs.length;
            } else if (
                event.key === "ArrowUp" ||
                event.key === "ArrowLeft"
            ) {
                nextIndex =
                    (index - 1 + settingsTabs.length) %
                    settingsTabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = settingsTabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();

            const nextTab = settingsTabs[nextIndex];
            activateSettingsTab(nextTab.dataset.settingsTab, true);
        });
    });

    /* Restore the last open tab */
    let savedTab = "profile";

    try {
        savedTab =
            localStorage.getItem("stacklyYouthActiveSettingsTab") ||
            "profile";
    } catch (error) {
        // Use the default tab if storage is unavailable.
    }

    const validTab = Array.from(settingsTabs).some(function (tab) {
        return tab.dataset.settingsTab === savedTab;
    });

    activateSettingsTab(validTab ? savedTab : "profile");

    /* =====================================================
       LOAD ADMINISTRATOR PROFILE
    ====================================================== */

    function loadAdminProfile() {
        const loginEmail = normalizeEmail(
            localStorage.getItem(LOGIN_EMAIL_KEY) || ""
        );

        const users = getUsers();

        const currentUser = users.find(function (user) {
            return normalizeEmail(user.email) === loginEmail;
        });

        const savedProfile = readStorage(
            "stacklyYouthAdminProfile",
            {}
        ) || {};

        const email = savedProfile.email || loginEmail;
        const name =
            savedProfile.name ||
            (currentUser && currentUser.name) ||
            getNameFromEmail(email);

        const phone =
            savedProfile.phone ||
            (profilePhone ? profilePhone.defaultValue : "");

        if (profileName) profileName.value = name;
        if (profileEmail) profileEmail.value = email;
        if (profilePhone && phone) profilePhone.value = phone;

        updateAdminProfileDisplay(name, email);
    }

    function updateAdminProfileDisplay(name, email) {
        if (profileDisplayName) {
            profileDisplayName.textContent = name;
        }

        if (profileDisplayEmail) {
            profileDisplayEmail.textContent = email;
        }

        /* Also update other admin profile displays if present */
        document.querySelectorAll(
            ".stackly-youth-admin-profile-name"
        ).forEach(function (element) {
            element.textContent = name;
        });

        document.querySelectorAll(
            ".stackly-youth-admin-profile-email"
        ).forEach(function (element) {
            element.textContent = email;
        });
    }

    loadAdminProfile();

    /* =====================================================
       SAVE ADMINISTRATOR PROFILE
    ====================================================== */

    if (profileSaveButton) {
        profileSaveButton.addEventListener("click", function () {
            if (!profileName || !profileEmail) return;

            const name = profileName.value.trim();
            const email = normalizeEmail(profileEmail.value);
            const phone = profilePhone
                ? profilePhone.value.trim()
                : "";

            clearProfileMessage();

            if (!name) {
                showProfileMessage(
                    "Please enter your full name.",
                    "error"
                );
                profileName.focus();
                return;
            }

            if (!isValidEmail(email)) {
                showProfileMessage(
                    "Please enter a valid email address.",
                    "error"
                );
                profileEmail.focus();
                return;
            }

            const users = getUsers();
            const oldLoginEmail = normalizeEmail(
                localStorage.getItem(LOGIN_EMAIL_KEY) || ""
            );

            const matchingUserIndex = users.findIndex(function (user) {
                return normalizeEmail(user.email) === oldLoginEmail;
            });

            const duplicateUser = users.find(function (user) {
                return normalizeEmail(user.email) === email &&
                    normalizeEmail(user.email) !== oldLoginEmail;
            });

            if (duplicateUser) {
                showProfileMessage(
                    "This email address is already registered.",
                    "error"
                );
                profileEmail.focus();
                return;
            }

            const profileData = {
                name: name,
                email: email,
                phone: phone
            };

            try {
                /* Update the registered user if one exists */
                if (matchingUserIndex !== -1) {
                    users[matchingUserIndex].name = name;
                    users[matchingUserIndex].email = email;

                    if (!writeStorage(USERS_KEY, users)) {
                        throw new Error("Unable to update user account.");
                    }
                }

                /* Save the editable profile independently */
                if (!writeStorage("stacklyYouthAdminProfile", profileData)) {
                    throw new Error("Unable to save profile details.");
                }

                /* Keep the active login email synchronized */
                localStorage.setItem(LOGIN_EMAIL_KEY, email);

                updateAdminProfileDisplay(name, email);

                showProfileMessage(
                    "Your administrator profile has been saved.",
                    "success"
                );

                /* Brief button confirmation */
                const originalButtonHTML = profileSaveButton.innerHTML;

                profileSaveButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Saved';

                profileSaveButton.classList.add("saved");

                window.setTimeout(function () {
                    profileSaveButton.innerHTML = originalButtonHTML;
                    profileSaveButton.classList.remove("saved");
                }, 1800);

            } catch (error) {
                console.error("Profile save failed:", error);

                showProfileMessage(
                    "Unable to save changes. Please try again.",
                    "error"
                );
            }
        });
    }

    [profileName, profileEmail, profilePhone].forEach(function (input) {
        if (!input) return;

        input.addEventListener("input", clearProfileMessage);
    });

    /* =====================================================
       FOUNDATION INFORMATION
    ====================================================== */

    const foundationFields = {
        name: document.getElementById("stacklyYouthFoundationName"),
        email: document.getElementById("stacklyYouthFoundationEmail"),
        phone: document.getElementById("stacklyYouthFoundationPhone"),
        address: document.getElementById("stacklyYouthFoundationAddress")
    };

    const foundationInputs = Object.values(foundationFields)
        .filter(Boolean);

    function loadFoundationSettings() {
        const saved = readStorage(FOUNDATION_KEY, {});
        if (!saved || typeof saved !== "object") return;

        Object.keys(foundationFields).forEach(function (key) {
            const input = foundationFields[key];

            if (input && saved[key] !== undefined) {
                input.value = saved[key];
            }
        });
    }

    function saveFoundationSettings() {
        const data = {};

        Object.keys(foundationFields).forEach(function (key) {
            const input = foundationFields[key];

            if (input) data[key] = input.value.trim();
        });

        if (!data.name) {
            alert("Please enter the foundation name.");
            foundationFields.name.focus();
            return false;
        }

        if (data.email && !isValidEmail(data.email)) {
            alert("Please enter a valid foundation email address.");
            foundationFields.email.focus();
            return false;
        }

        if (!writeStorage(FOUNDATION_KEY, data)) {
            alert("Unable to save foundation settings.");
            return false;
        }

        return true;
    }

    loadFoundationSettings();

    const foundationPanel = settingsRoot.querySelector(
        '[data-settings-panel="foundation"]'
    );

    if (foundationPanel) {
        const saveButton = foundationPanel.querySelector(
            ".stackly-youth-admin-settings-save-btn"
        );

        if (saveButton) {
            saveButton.addEventListener("click", function () {
                if (saveFoundationSettings()) {
                    showButtonSavedState(saveButton, "Saved");
                }
            });
        }
    }

    /* =====================================================
       SAVE BUTTON FEEDBACK
    ====================================================== */

    function showButtonSavedState(button, label) {
        const originalHTML = button.innerHTML;

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> ' + label;

        button.classList.add("saved");

        window.setTimeout(function () {
            button.innerHTML = originalHTML;
            button.classList.remove("saved");
        }, 1800);
    }

    /* =====================================================
       NOTIFICATION PREFERENCES
    ====================================================== */

    const notificationPanel = settingsRoot.querySelector(
        '[data-settings-panel="notifications"]'
    );

    function loadCheckboxSettings(panel, storageKey) {
        if (!panel) return;

        const checkboxes = panel.querySelectorAll(
            ".stackly-youth-admin-switch input[type='checkbox']"
        );

        const savedValues = readStorage(storageKey, []);

        checkboxes.forEach(function (checkbox, index) {
            if (savedValues[index] !== undefined) {
                checkbox.checked = Boolean(savedValues[index]);
            }
        });
    }

    function saveCheckboxSettings(panel, storageKey) {
        if (!panel) return false;

        const checkboxes = panel.querySelectorAll(
            ".stackly-youth-admin-switch input[type='checkbox']"
        );

        const values = Array.from(checkboxes).map(function (checkbox) {
            return checkbox.checked;
        });

        return writeStorage(storageKey, values);
    }

    if (notificationPanel) {
        loadCheckboxSettings(
            notificationPanel,
            NOTIFICATION_KEY
        );

        const notificationCheckboxes =
            notificationPanel.querySelectorAll(
                ".stackly-youth-admin-switch input[type='checkbox']"
            );

        notificationCheckboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                saveCheckboxSettings(
                    notificationPanel,
                    NOTIFICATION_KEY
                );
            });
        });

        const notificationSaveButton =
            notificationPanel.querySelector(
                ".stackly-youth-admin-settings-save-btn"
            );

        if (notificationSaveButton) {
            notificationSaveButton.addEventListener(
                "click",
                function () {
                    if (
                        saveCheckboxSettings(
                            notificationPanel,
                            NOTIFICATION_KEY
                        )
                    ) {
                        showButtonSavedState(
                            notificationSaveButton,
                            "Saved"
                        );
                    }
                }
            );
        }
    }

    /* =====================================================
       FOUNDATION TOGGLES
    ====================================================== */

    if (foundationPanel) {
        loadCheckboxSettings(
            foundationPanel,
            "stacklyYouthFoundationToggles"
        );

        foundationPanel.querySelectorAll(
            ".stackly-youth-admin-switch input[type='checkbox']"
        ).forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                saveCheckboxSettings(
                    foundationPanel,
                    "stacklyYouthFoundationToggles"
                );
            });
        });
    }

    /* =====================================================
       SECURITY PREFERENCES
    ====================================================== */

    const securityPanel = settingsRoot.querySelector(
        '[data-settings-panel="security"]'
    );

    if (securityPanel) {
        loadCheckboxSettings(
            securityPanel,
            "stacklyYouthSecuritySettings"
        );

        securityPanel.querySelectorAll(
            ".stackly-youth-admin-switch input[type='checkbox']"
        ).forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                saveCheckboxSettings(
                    securityPanel,
                    "stacklyYouthSecuritySettings"
                );
            });
        });

        /* These buttons are UI placeholders until connected
           to real password/session management. */
        securityPanel.querySelectorAll(
            ".stackly-youth-admin-settings-security-card button"
        ).forEach(function (button) {
            button.addEventListener("click", function () {
                const card = button.closest(
                    ".stackly-youth-admin-settings-security-card"
                );

                const title = card
                    ? card.querySelector("strong")?.textContent.trim()
                    : "Security setting";

                let message = "";

                if (title === "Password") {
                    message =
                        "Password management needs to be connected to your authentication system.";
                } else if (title === "Login Activity") {
                    message =
                        "Session review needs to be connected to your authentication system.";
                }

                if (message) {
                    showSecurityNotice(securityPanel, message);
                }
            });
        });
    }

    function showSecurityNotice(panel, message) {
        let notice = panel.querySelector(
            ".stackly-youth-admin-security-notice"
        );

        if (!notice) {
            notice = document.createElement("p");
            notice.className =
                "stackly-youth-admin-security-notice";
            notice.setAttribute("role", "status");

            const banner = panel.querySelector(
                ".stackly-youth-admin-settings-security-banner"
            );

            if (banner) {
                banner.insertAdjacentElement("afterend", notice);
            } else {
                panel.prepend(notice);
            }
        }

        notice.textContent = message;
    }

    /* =====================================================
       APPEARANCE — THEME SELECTION
    ====================================================== */

    const appearancePanel = settingsRoot.querySelector(
        '[data-settings-panel="appearance"]'
    );

    const themeCards = appearancePanel
        ? appearancePanel.querySelectorAll(
            ".stackly-youth-admin-settings-theme-card"
        )
        : [];

    function applyTheme(themeName) {
        const validThemes = ["light", "soft", "contrast"];

        const theme = validThemes.includes(themeName)
            ? themeName
            : "light";

        settingsRoot.classList.remove(
            "settings-theme-light",
            "settings-theme-soft",
            "settings-theme-contrast"
        );

        settingsRoot.classList.add(
            "settings-theme-" + theme
        );

        themeCards.forEach(function (card) {
            const preview = card.querySelector(".theme-preview");
            const isSelected = preview
                ? preview.classList.contains(theme)
                : false;

            card.classList.toggle("active", isSelected);

            if (isSelected) {
                card.setAttribute("aria-pressed", "true");
            } else {
                card.setAttribute("aria-pressed", "false");
            }
        });

        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            console.warn("Unable to save theme preference.");
        }
    }

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem(THEME_KEY) || "light";
    } catch (error) {
        // Keep default theme.
    }

    applyTheme(savedTheme);

    themeCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const preview = card.querySelector(".theme-preview");
            if (!preview) return;

            let theme = "light";

            if (preview.classList.contains("soft")) {
                theme = "soft";
            } else if (preview.classList.contains("contrast")) {
                theme = "contrast";
            }

            applyTheme(theme);
        });
    });

    /* =====================================================
       APPEARANCE — DISPLAY PREFERENCES
    ====================================================== */

    if (appearancePanel) {
        loadCheckboxSettings(
            appearancePanel,
            DISPLAY_KEY
        );

        appearancePanel.querySelectorAll(
            ".stackly-youth-admin-switch input[type='checkbox']"
        ).forEach(function (checkbox, index) {
            checkbox.addEventListener("change", function () {
                saveCheckboxSettings(
                    appearancePanel,
                    DISPLAY_KEY
                );

                /* Apply compact-sidebar preference if the
                   admin sidebar exists. */
                const label = checkbox.closest("label");
                const row = label ? label.closest("div") : null;
                const text = row
                    ? row.textContent.toLowerCase()
                    : "";

                if (text.includes("compact sidebar")) {
                    document.body.classList.toggle(
                        "stackly-youth-admin-compact-sidebar",
                        checkbox.checked
                    );
                }

                /* Motion effects preference */
                if (text.includes("motion effects")) {
                    document.body.classList.toggle(
                        "stackly-youth-admin-motion-disabled",
                        !checkbox.checked
                    );
                }
            });
        });

        /* Restore visual display preferences */
        const displayCheckboxes =
            appearancePanel.querySelectorAll(
                ".stackly-youth-admin-switch input[type='checkbox']"
            );

        displayCheckboxes.forEach(function (checkbox) {
            const row = checkbox.closest("div");
            const text = row
                ? row.textContent.toLowerCase()
                : "";

            if (text.includes("compact sidebar")) {
                document.body.classList.toggle(
                    "stackly-youth-admin-compact-sidebar",
                    checkbox.checked
                );
            }

            if (text.includes("motion effects")) {
                document.body.classList.toggle(
                    "stackly-youth-admin-motion-disabled",
                    !checkbox.checked
                );
            }
        });
    }

    /* =====================================================
       INPUT ACCESSIBILITY
    ====================================================== */

    settingsRoot.querySelectorAll("input, textarea").forEach(
        function (input) {
            input.addEventListener("input", function () {
                input.classList.remove(
                    "stackly-youth-admin-input-invalid"
                );
                input.removeAttribute("aria-invalid");
            });
        }
    );

    /* =====================================================
       INITIALIZE ARIA STATES
    ====================================================== */

    settingsTabs.forEach(function (tab) {
        tab.setAttribute("type", "button");
    });

    console.log("Stackly Youth Admin Settings initialized.");

});