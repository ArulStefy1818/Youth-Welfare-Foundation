/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   CLIENT DASHBOARD JAVASCRIPT
   SIDEBAR + USER DETAILS + DATE + LOGOUT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById(
        "stacklyYouthClientSidebar"
    );

    const menuToggle = document.getElementById(
        "stacklyYouthClientMenuToggle"
    );

    const menuClose = document.getElementById(
        "stacklyYouthClientMenuClose"
    );

    const overlay = document.getElementById(
        "stacklyYouthClientOverlay"
    );

    const navLinks = document.querySelectorAll(
        ".stackly-youth-client-nav a"
    );

    const logoutLink = document.getElementById(
        "stacklyYouthClientLogout"
    );


    /* =====================================================
       SIDEBAR CHECK
    ====================================================== */

    if (
        !sidebar ||
        !menuToggle ||
        !menuClose ||
        !overlay
    ) {
        console.warn(
            "Stackly Youth client sidebar elements are missing."
        );

        return;
    }


    /* =====================================================
       OPEN SIDEBAR
    ====================================================== */

    function openMenu() {

        sidebar.classList.add("open");
        sidebar.classList.add(
            "stackly-youth-client-sidebar-open"
        );

        overlay.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add(
            "stackly-youth-client-menu-active"
        );

        document.body.classList.add(
            "stackly-youth-client-sidebar-active"
        );

        document.body.style.overflow = "hidden";

        /* Change hamburger to X */
        const toggleIcon = menuToggle.querySelector("i");

        if (toggleIcon) {

            toggleIcon.classList.remove(
                "fa-bars"
            );

            toggleIcon.classList.add(
                "fa-xmark"
            );
        }

        sidebar.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    /* =====================================================
       CLOSE SIDEBAR
    ====================================================== */

    function closeMenu() {

        sidebar.classList.remove("open");

        sidebar.classList.remove(
            "stackly-youth-client-sidebar-open"
        );

        overlay.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove(
            "stackly-youth-client-menu-active"
        );

        document.body.classList.remove(
            "stackly-youth-client-sidebar-active"
        );

        document.body.style.overflow = "";

        /* Change X back to hamburger */
        const toggleIcon = menuToggle.querySelector("i");

        if (toggleIcon) {

            toggleIcon.classList.remove(
                "fa-xmark"
            );

            toggleIcon.classList.add(
                "fa-bars"
            );
        }

        sidebar.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* =====================================================
       TOGGLE BUTTON
    ====================================================== */

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (
                sidebar.classList.contains("open") ||
                sidebar.classList.contains(
                    "stackly-youth-client-sidebar-open"
                )
            ) {

                closeMenu();

            } else {

                openMenu();
            }
        }
    );


    /* =====================================================
       CLOSE BUTTON
    ====================================================== */

    menuClose.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeMenu();
        }
    );


    /* =====================================================
       OVERLAY CLICK
    ====================================================== */

    overlay.addEventListener(
        "click",
        function () {

            closeMenu();
        }
    );


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                sidebar.classList.contains("open")
            ) {

                closeMenu();
            }
        }
    );


    /* =====================================================
       SIDEBAR NAVIGATION
    ====================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(function (item) {

                    item.classList.remove("active");

                    item.removeAttribute(
                        "aria-current"
                    );

                });

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );

                closeMenu();
            }
        );
    });


    /* =====================================================
       INITIAL SIDEBAR STATE
    ====================================================== */

    sidebar.setAttribute(
        "aria-hidden",
        "true"
    );


    /* =====================================================
       CURRENT DATE
    ====================================================== */

    const dateElement =
        document.getElementById(
            "stacklyYouthClientCurrentDate"
        );

    if (dateElement) {

        const currentDate = new Date();

        dateElement.textContent =
            currentDate.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );
    }


    /* =====================================================
       USER ELEMENTS
    ====================================================== */

    const emailElement =
        document.getElementById(
            "stacklyYouthClientUserEmail"
        );

    const nameElement =
        document.getElementById(
            "stacklyYouthClientUserName"
        );

    const welcomeElement =
        document.getElementById(
            "stacklyYouthClientWelcomeName"
        );

    const avatarElement =
        document.getElementById(
            "stacklyYouthClientAvatar"
        );


    /* =====================================================
       GET SAVED EMAIL
    ====================================================== */

    function getSavedEmail() {

        const possibleKeys = [
            "stacklyYouthLoginEmail",
            "loginEmail"
        ];

        for (
            let i = 0;
            i < possibleKeys.length;
            i++
        ) {

            const value =
                localStorage.getItem(
                    possibleKeys[i]
                );

            if (
                value &&
                value.trim()
            ) {

                return value.trim().toLowerCase();
            }
        }

        return "";
    }


    /* =====================================================
       CREATE NAME FROM EMAIL
       
       arul@gmail.com
       → Arul

       arul.stefy@gmail.com
       → Arul

       arul_stefy@gmail.com
       → Arul
    ====================================================== */

    function getNameFromEmail(email) {

        if (!email || !email.includes("@")) {

            return "Client";
        }

        const localPart =
            email
                .split("@")[0]
                .trim();

        if (!localPart) {

            return "Client";
        }

        /*
           Take the first section before:
           .
           _
           -
           +
        */

        const firstWord =
            localPart
                .split(/[._\-+]/)[0]
                .trim();

        if (!firstWord) {

            return "Client";
        }

        return (
            firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1)
        );
    }


    /* =====================================================
       LOAD CLIENT DETAILS
    ====================================================== */

    try {

        const savedEmail =
            getSavedEmail();

        let savedProfile = {};

        try {

            savedProfile =
                JSON.parse(
                    localStorage.getItem(
                        "stacklyYouthClientProfile"
                    ) || "{}"
                );

        } catch (profileError) {

            savedProfile = {};
        }


        /* =================================================
           EMAIL
        ================================================= */

        const profileEmail =
            savedProfile.email
                ? savedProfile.email.trim().toLowerCase()
                : "";

        const email =
            profileEmail ||
            savedEmail ||
            "client@stacklyyouth.org";


        /* =================================================
           NAME

           Priority:
           1. Profile name if available
           2. First word of email
        ================================================= */

        let displayName = "";

        if (
            savedProfile.name &&
            savedProfile.name.trim()
        ) {

            displayName =
                savedProfile.name.trim();

        } else {

            displayName =
                getNameFromEmail(email);
        }


        /* =================================================
           DISPLAY EMAIL
        ================================================= */

        if (emailElement) {

            emailElement.textContent =
                email;
        }


        /* =================================================
           DISPLAY USER NAME
        ================================================= */

        if (nameElement) {

            nameElement.textContent =
                displayName;
        }


        /* =================================================
           DISPLAY WELCOME NAME
        ================================================= */

        if (welcomeElement) {

            const welcomeName =
                displayName
                    .trim()
                    .split(/\s+/)[0];

            welcomeElement.textContent =
                welcomeName || "Client";
        }


        /* =================================================
           DISPLAY AVATAR
        ================================================= */

        if (avatarElement) {

            avatarElement.textContent =
                displayName
                    .trim()
                    .charAt(0)
                    .toUpperCase() || "C";
        }


        /* =================================================
           SAVE PROFILE FOR FUTURE PAGES
        ================================================= */

        const profileToSave = {

            name: displayName,

            email: email,

            role:
                savedProfile.role ||
                localStorage.getItem(
                    "stacklyYouthLoginRole"
                ) ||
                localStorage.getItem(
                    "loginRole"
                ) ||
                "client"
        };

        localStorage.setItem(
            "stacklyYouthClientProfile",
            JSON.stringify(profileToSave)
        );

    } catch (error) {

        console.warn(
            "Client profile could not be loaded.",
            error
        );

        if (emailElement) {

            emailElement.textContent =
                "client@stacklyyouth.org";
        }

        if (nameElement) {

            nameElement.textContent =
                "Client";
        }

        if (welcomeElement) {

            welcomeElement.textContent =
                "Client";
        }

        if (avatarElement) {

            avatarElement.textContent =
                "C";
        }
    }


    /* =====================================================
       RESPONSIVE SIDEBAR
    ====================================================== */

    function checkDesktopState() {

        if (window.innerWidth > 991) {

            closeMenu();
        }
    }

    window.addEventListener(
        "resize",
        checkDesktopState
    );


    /* =====================================================
       LOGOUT
    ====================================================== */

    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeMenu();

                try {

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
                        "loginEmail"
                    );

                    localStorage.removeItem(
                        "loginRole"
                    );

                    localStorage.removeItem(
                        "stacklyYouthClientProfile"
                    );

                    localStorage.removeItem(
                        "stacklyYouthRemember"
                    );

                    sessionStorage.clear();

                } catch (error) {

                    console.warn(
                        "Could not clear client session.",
                        error
                    );
                }

                window.location.href =
                    "index.html";
            }
        );
    }

});


/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   CLIENT MESSAGES — MESSAGE TOOLBAR FILTERS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const messagesPage =
        document.querySelector(".stackly-youth-client-messages-page");

    if (!messagesPage) {
        return;
    }


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const filterButtons = [
        ...messagesPage.querySelectorAll(
            ".stackly-youth-client-message-filter"
        )
    ];

    const messageCards = [
        ...messagesPage.querySelectorAll(
            ".stackly-youth-client-message-card"
        )
    ];


    if (!filterButtons.length || !messageCards.length) {
        return;
    }


    /* =====================================================
       DETERMINE MESSAGE TYPE
    ====================================================== */

    const messageData = messageCards.map((card) => {

        const isUnread =
            card.classList.contains("unread");

        const hasImportantTag =
            [...card.querySelectorAll(
                ".stackly-youth-client-message-tags span"
            )].some((tag) =>
                tag.textContent.trim().toLowerCase() === "important"
            );

        return {
            card,
            unread: isUnread,
            important: hasImportantTag
        };
    });


    /* =====================================================
       FILTER ANIMATION
    ====================================================== */

    const hideCard = (card) => {

        card.classList.remove(
            "stackly-youth-client-message-visible"
        );

        card.classList.add(
            "stackly-youth-client-message-hidden"
        );

        card.setAttribute("aria-hidden", "true");
    };


    const showCard = (card, index = 0) => {

        card.classList.remove(
            "stackly-youth-client-message-hidden"
        );

        card.setAttribute("aria-hidden", "false");

        card.style.animationDelay = `${index * 70}ms`;

        requestAnimationFrame(() => {

            card.classList.add(
                "stackly-youth-client-message-visible"
            );

        });
    };


    /* =====================================================
       EMPTY STATE
    ====================================================== */

    let emptyState =
        messagesPage.querySelector(
            ".stackly-youth-client-message-empty"
        );


    if (!emptyState) {

        emptyState = document.createElement("div");

        emptyState.className =
            "stackly-youth-client-message-empty";

        emptyState.innerHTML = `
            <div class="stackly-youth-client-message-empty-icon">
                <i class="fa-solid fa-envelope-open"></i>
            </div>

            <h3>No Messages Found</h3>

            <p>
                There are no messages available for this filter.
            </p>
        `;

        const messageList =
            messagesPage.querySelector(
                ".stackly-youth-client-messages-list"
            );

        if (messageList) {
            messageList.appendChild(emptyState);
        }
    }


    /* =====================================================
       UPDATE FILTER COUNTS
    ====================================================== */

    const updateFilterCounts = () => {

        const totalCount =
            messageData.length;

        const unreadCount =
            messageData.filter(
                item => item.unread
            ).length;

        const importantCount =
            messageData.filter(
                item => item.important
            ).length;

        filterButtons.forEach((button) => {

            const text =
                button.textContent.trim().toLowerCase();

            let count = totalCount;

            if (text.includes("unread")) {
                count = unreadCount;
            }

            if (text.includes("important")) {
                count = importantCount;
            }

            let countBadge =
                button.querySelector(
                    ".stackly-youth-client-message-filter-count"
                );

            if (!countBadge) {

                countBadge =
                    document.createElement("span");

                countBadge.className =
                    "stackly-youth-client-message-filter-count";

                button.appendChild(countBadge);
            }

            countBadge.textContent = count;
        });
    };


    /* =====================================================
       SET ACCESSIBILITY
    ====================================================== */

    filterButtons.forEach((button, index) => {

        button.setAttribute(
            "aria-pressed",
            index === 0 ? "true" : "false"
        );

        button.setAttribute(
            "data-message-filter",
            index === 0
                ? "all"
                : button.textContent
                    .trim()
                    .toLowerCase()
                    .includes("unread")
                    ? "unread"
                    : "important"
        );

    });


    /* =====================================================
       APPLY FILTER
    ====================================================== */

    const applyFilter = (filterType) => {

        let visibleCount = 0;

        messageData.forEach((item) => {

            let shouldShow = true;

            switch (filterType) {

                case "unread":
                    shouldShow = item.unread;
                    break;

                case "important":
                    shouldShow = item.important;
                    break;

                case "all":
                default:
                    shouldShow = true;
                    break;
            }


            if (shouldShow) {

                showCard(
                    item.card,
                    visibleCount
                );

                visibleCount++;

            } else {

                hideCard(item.card);

            }

        });


        /* Toggle empty state */

        if (emptyState) {

            emptyState.classList.toggle(
                "show",
                visibleCount === 0
            );
        }


        /* Update button accessibility */

        filterButtons.forEach((button) => {

            const buttonFilter =
                button.getAttribute(
                    "data-message-filter"
                );

            const isActive =
                buttonFilter === filterType;

            button.classList.toggle(
                "active",
                isActive
            );

            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );
        });

    };


    /* =====================================================
       FILTER CLICK EVENTS
    ====================================================== */

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const filter =
                button.getAttribute(
                    "data-message-filter"
                );

            applyFilter(filter);

        });

    });


    /* =====================================================
       KEYBOARD SUPPORT
    ====================================================== */

    filterButtons.forEach((button) => {

        button.addEventListener("keydown", (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                button.click();
            }

        });

    });


    /* =====================================================
       INITIALIZE
    ====================================================== */

    updateFilterCounts();

    applyFilter("all");


    /* =====================================================
       OPTIONAL:
       MARK MESSAGE AS READ WHEN OPENED
    ====================================================== */

    const messageOpenButtons =
        messagesPage.querySelectorAll(
            ".stackly-youth-client-message-open"
        );

    messageOpenButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card =
                button.closest(
                    ".stackly-youth-client-message-card"
                );

            if (!card) {
                return;
            }

            card.classList.remove("unread");

            const indicator =
                card.querySelector(
                    ".stackly-youth-client-message-avatar > i"
                );

            if (indicator) {
                indicator.remove();
            }

            const messageIndex =
                messageData.findIndex(
                    item => item.card === card
                );

            if (messageIndex !== -1) {

                messageData[messageIndex].unread =
                    false;
            }

            updateFilterCounts();
        });

    });

});


/* =========================================================
   STACKLY YOUTH CLIENT PROFILE
   USER NAME + EMAIL + AVATAR + PROFILE DETAILS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROFILE ELEMENTS
    ====================================================== */

    const profileName = document.getElementById(
        "stacklyYouthProfileName"
    );

    const profileEmail = document.getElementById(
        "stacklyYouthProfileEmail"
    );

    const profileAvatar = document.getElementById(
        "stacklyYouthProfileAvatar"
    );

    const profileDetailName = document.getElementById(
        "stacklyYouthProfileDetailName"
    );

    const profileDetailEmail = document.getElementById(
        "stacklyYouthProfileDetailEmail"
    );


    /* =====================================================
       GET SAVED LOGIN EMAIL
    ====================================================== */

    function getSavedEmail() {

        const newEmail =
            localStorage.getItem("stacklyYouthLoginEmail");

        const oldEmail =
            localStorage.getItem("loginEmail");

        const email =
            newEmail || oldEmail || "";

        return email.trim().toLowerCase();
    }


    /* =====================================================
       CREATE NAME FROM EMAIL

       arul@gmail.com
       → Arul

       arul.stefy@gmail.com
       → Arul

       arul_stefy@gmail.com
       → Arul

       arul-stefy@gmail.com
       → Arul
    ====================================================== */

    function getNameFromEmail(email) {

        if (!email || !email.includes("@")) {
            return "User";
        }

        const localPart =
            email.split("@")[0].trim();

        if (!localPart) {
            return "User";
        }

        const firstWord =
            localPart
                .split(/[._\-+]+/)[0]
                .trim();

        if (!firstWord) {
            return "User";
        }

        return (
            firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1).toLowerCase()
        );
    }


    /* =====================================================
       LOAD USER
    ====================================================== */

    const storedEmail = getSavedEmail();

    const email =
        storedEmail ||
        "client@stacklyyouth.org";

    const userName =
        getNameFromEmail(email);


    /* =====================================================
       PROFILE HERO NAME
    ====================================================== */

    if (profileName) {

        profileName.textContent =
            userName;
    }


    /* =====================================================
       PROFILE HERO EMAIL
    ====================================================== */

    if (profileEmail) {

        profileEmail.textContent =
            email;
    }


    /* =====================================================
       PROFILE AVATAR
    ====================================================== */

    if (profileAvatar) {

        profileAvatar.textContent =
            userName
                .charAt(0)
                .toUpperCase();
    }


    /* =====================================================
       FULL NAME
    ====================================================== */

    if (profileDetailName) {

        profileDetailName.textContent =
            userName;
    }


    /* =====================================================
       EMAIL ADDRESS
    ====================================================== */

    if (profileDetailEmail) {

        profileDetailEmail.textContent =
            email;
    }


    /* =====================================================
       KEEP PROFILE DATA SAVED
    ====================================================== */

    localStorage.setItem(
        "stacklyYouthClientProfile",
        JSON.stringify({
            name: userName,
            email: email,
            role:
                localStorage.getItem(
                    "stacklyYouthLoginRole"
                ) ||
                localStorage.getItem(
                    "loginRole"
                ) ||
                "client"
        })
    );

});


/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   CLIENT EVENTS — MINI EVENT CALENDAR
   DYNAMIC MONTH NAVIGATION + EVENT HIGHLIGHTS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const calendar = document.querySelector(
        ".stackly-youth-client-events-mini-calendar"
    );

    if (!calendar) {
        return;
    }


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const monthTitle = calendar.querySelector(
        ".stackly-youth-client-events-calendar-top strong"
    );

    const previousButton = calendar.querySelector(
        ".stackly-youth-client-events-calendar-top button:first-child"
    );

    const nextButton = calendar.querySelector(
        ".stackly-youth-client-events-calendar-top button:last-child"
    );

    const weekdaysContainer = calendar.querySelector(
        ".stackly-youth-client-events-calendar-weekdays"
    );

    const daysContainer = calendar.querySelector(
        ".stackly-youth-client-events-calendar-days"
    );


    if (
        !monthTitle ||
        !previousButton ||
        !nextButton ||
        !weekdaysContainer ||
        !daysContainer
    ) {
        return;
    }


    /* =====================================================
       WEEKDAYS
    ====================================================== */

    const weekdays = [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"
    ];


    /* =====================================================
       SAMPLE FOUNDATION EVENTS

       Add or remove events here.
       Date format: YYYY-MM-DD
    ====================================================== */

    const foundationEvents = {
        "2026-10-18": {
            title: "Youth Skills Workshop",
            type: "Workshop"
        },

        "2026-10-26": {
            title: "Community Outreach Day",
            type: "Community"
        },

        "2026-11-08": {
            title: "Youth Wellness Camp",
            type: "Health"
        },

        "2026-11-21": {
            title: "Volunteer Orientation",
            type: "Volunteer"
        },

        "2026-12-05": {
            title: "Education Support Program",
            type: "Education"
        },

        "2026-12-19": {
            title: "Youth Community Meet",
            type: "Community"
        }
    };


    /* =====================================================
       CURRENT DISPLAYED MONTH

       October 2026 by default
    ====================================================== */

    let currentDate = new Date(
        2026,
        9,
        1
    );


    /* =====================================================
       MONTH NAMES
    ====================================================== */

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    /* =====================================================
       FORMAT DATE KEY

       Example:
       2026-10-18
    ====================================================== */

    function formatDateKey(year, month, day) {

        return (
            year +
            "-" +
            String(month + 1).padStart(2, "0") +
            "-" +
            String(day).padStart(2, "0")
        );

    }


    /* =====================================================
       CREATE CALENDAR
    ====================================================== */

    function renderCalendar() {

        const year =
            currentDate.getFullYear();

        const month =
            currentDate.getMonth();


        /* Update month title */

        monthTitle.textContent =
            `${monthNames[month]} ${year}`;


        /* Clear previous days */

        daysContainer.innerHTML = "";


        /* =================================================
           FIRST DAY OF MONTH

           Convert Sunday = 6
           Monday = 0
        ================================================== */

        const firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();

        const mondayIndex =
            firstDay === 0
                ? 6
                : firstDay - 1;


        /* =================================================
           NUMBER OF DAYS
        ================================================== */

        const daysInCurrentMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        /* =================================================
           NUMBER OF DAYS IN PREVIOUS MONTH
        ================================================== */

        const daysInPreviousMonth =
            new Date(
                year,
                month,
                0
            ).getDate();


        /* =================================================
           PREVIOUS MONTH DATES
        ================================================== */

        for (
            let i = mondayIndex - 1;
            i >= 0;
            i--
        ) {

            const day =
                daysInPreviousMonth - i;

            const span =
                document.createElement("span");

            span.textContent = day;

            span.classList.add(
                "calendar-other-month"
            );

            daysContainer.appendChild(span);
        }


        /* =================================================
           CURRENT MONTH DATES
        ================================================== */

        for (
            let day = 1;
            day <= daysInCurrentMonth;
            day++
        ) {

            const span =
                document.createElement("span");

            span.textContent = day;


            const dateKey =
                formatDateKey(
                    year,
                    month,
                    day
                );


            /* Event check */

            if (
                foundationEvents[dateKey]
            ) {

                const event =
                    foundationEvents[dateKey];

                span.classList.add(
                    "event-day"
                );

                span.setAttribute(
                    "data-event",
                    event.title
                );

                span.setAttribute(
                    "data-event-type",
                    event.type
                );

                span.setAttribute(
                    "tabindex",
                    "0"
                );

                span.setAttribute(
                    "role",
                    "button"
                );

                span.setAttribute(
                    "aria-label",
                    `${event.title} on ${day} ${monthNames[month]} ${year}`
                );


                /* Event indicator */

                const indicator =
                    document.createElement(
                        "small"
                    );

                indicator.setAttribute(
                    "aria-hidden",
                    "true"
                );

                span.appendChild(
                    indicator
                );


                /* Different color for community event */

                if (
                    event.type.toLowerCase() ===
                    "community"
                ) {

                    span.classList.add(
                        "orange"
                    );

                }


                /* Click event */

                span.addEventListener(
                    "click",
                    function () {

                        showEventMessage(
                            event,
                            day,
                            monthNames[month],
                            year
                        );

                    }
                );


                /* Keyboard support */

                span.addEventListener(
                    "keydown",
                    function (eventKey) {

                        if (
                            eventKey.key ===
                                "Enter" ||
                            eventKey.key ===
                                " "
                        ) {

                            eventKey.preventDefault();

                            showEventMessage(
                                event,
                                day,
                                monthNames[month],
                                year
                            );
                        }

                    }
                );

            }


            /* =================================================
               TODAY HIGHLIGHT
            ================================================== */

            const today =
                new Date();

            const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;


            if (isToday) {

                span.classList.add(
                    "today"
                );

                span.setAttribute(
                    "aria-current",
                    "date"
                );
            }


            daysContainer.appendChild(
                span
            );

        }


        /* =================================================
           NEXT MONTH DATES

           Fill remaining cells to complete 6 rows
        ================================================== */

        const totalCells =
            daysContainer.children.length;

        const remainingCells =
            42 - totalCells;


        for (
            let day = 1;
            day <= remainingCells;
            day++
        ) {

            const span =
                document.createElement("span");

            span.textContent = day;

            span.classList.add(
                "calendar-other-month"
            );

            daysContainer.appendChild(
                span
            );
        }


        /* =================================================
           UPDATE BUTTON STATES
        ================================================== */

        previousButton.setAttribute(
            "aria-label",
            `Previous month`
        );

        nextButton.setAttribute(
            "aria-label",
            `Next month`
        );

    }


    /* =====================================================
       EVENT MESSAGE
    ====================================================== */

    function showEventMessage(
        event,
        day,
        month,
        year
    ) {

        let eventMessage =
            calendar.querySelector(
                ".stackly-youth-client-calendar-event-message"
            );


        /* Create message if missing */

        if (!eventMessage) {

            eventMessage =
                document.createElement(
                    "div"
                );

            eventMessage.className =
                "stackly-youth-client-calendar-event-message";

            calendar.appendChild(
                eventMessage
            );
        }


        eventMessage.innerHTML = `
            <div class="stackly-youth-client-calendar-event-message-icon">
                <i class="fa-solid fa-calendar-check"></i>
            </div>

            <div class="stackly-youth-client-calendar-event-message-content">
                <strong>${event.title}</strong>

                <span>
                    ${day} ${month} ${year} · ${event.type}
                </span>
            </div>

            <button
                type="button"
                class="stackly-youth-client-calendar-event-message-close"
                aria-label="Close event details"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;


        eventMessage.classList.add(
            "show"
        );


        /* Close event */

        const closeButton =
            eventMessage.querySelector(
                ".stackly-youth-client-calendar-event-message-close"
            );

        closeButton.addEventListener(
            "click",
            function () {

                eventMessage.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       PREVIOUS MONTH
    ====================================================== */

    previousButton.addEventListener(
        "click",
        function () {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


    /* =====================================================
       NEXT MONTH
    ====================================================== */

    nextButton.addEventListener(
        "click",
        function () {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


    /* =====================================================
       BUTTON KEYBOARD SUPPORT
    ====================================================== */

    previousButton.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                previousButton.click();
            }

        }
    );


    nextButton.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                nextButton.click();
            }

        }
    );


    /* =====================================================
       INITIALIZE CALENDAR
    ====================================================== */

    renderCalendar();

});