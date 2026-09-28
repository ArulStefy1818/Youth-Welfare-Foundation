/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   LOGIN + SIGN UP JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AOS INITIALIZATION
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
       ELEMENTS
    ====================================================== */

    const loginTab =
        document.getElementById("stacklyYouthLoginTab");

    const signupTab =
        document.getElementById("stacklyYouthSignupTab");

    const loginForm =
        document.getElementById("stacklyYouthLoginForm");

    const signupForm =
        document.getElementById("stacklyYouthSignupForm");

    const authTitle =
        document.getElementById("stacklyYouthAuthTitle");

    const authSubtitle =
        document.getElementById("stacklyYouthAuthSubtitle");

    const loginMessage =
        document.getElementById("stacklyYouthLoginMessage");

    const signupMessage =
        document.getElementById("stacklyYouthSignupMessage");


    /* =====================================================
       STORAGE KEYS
    ====================================================== */

    const USERS_KEY = "stacklyYouthUsers";
    const LOGIN_EMAIL_KEY = "stacklyYouthLoginEmail";
    const LOGIN_ROLE_KEY = "stacklyYouthLoginRole";
    const LOGIN_STATUS_KEY = "stacklyYouthLoggedIn";
    const REMEMBER_KEY = "stacklyYouthRemember";


    /* =====================================================
       LOGIN CUSTOM ROLE DROPDOWN
    ====================================================== */

    const loginRoleDropdown =
        document.getElementById(
            "stacklyYouthLoginRoleDropdown"
        );

    const loginRoleTrigger =
        document.getElementById(
            "stacklyYouthLoginRoleTrigger"
        );

    const loginRoleText =
        document.getElementById(
            "stacklyYouthLoginRoleText"
        );

    const loginRoleInput =
        document.getElementById(
            "stacklyYouthLoginRole"
        );

    const loginRoleMenu =
        document.getElementById(
            "stacklyYouthLoginRoleMenu"
        );


    /* =====================================================
       SIGNUP CUSTOM ROLE DROPDOWN
    ====================================================== */

    const signupRoleDropdown =
        document.getElementById(
            "stacklyYouthSignupRoleDropdown"
        );

    const signupRoleTrigger =
        document.getElementById(
            "stacklyYouthSignupRoleTrigger"
        );

    const signupRoleText =
        document.getElementById(
            "stacklyYouthSignupRoleText"
        );

    const signupRoleInput =
        document.getElementById(
            "stacklyYouthSignupRole"
        );

    const signupRoleMenu =
        document.getElementById(
            "stacklyYouthSignupRoleMenu"
        );


    /* =====================================================
       CLOSE ALL CUSTOM DROPDOWNS
    ====================================================== */

    function closeAllYouthDropdowns(exceptDropdown = null) {

        document
            .querySelectorAll(
                ".stackly-youth-custom-dropdown.open"
            )
            .forEach(function (dropdown) {

                if (dropdown !== exceptDropdown) {

                    dropdown.classList.remove("open");

                    const trigger =
                        dropdown.querySelector(
                            ".stackly-youth-custom-dropdown-trigger"
                        );

                    if (trigger) {
                        trigger.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                }
            });
    }


    /* =====================================================
       CUSTOM DROPDOWN INITIALIZER
    ====================================================== */

    function initYouthCustomDropdown(
        dropdown,
        trigger,
        textElement,
        hiddenInput,
        menu
    ) {

        if (
            !dropdown ||
            !trigger ||
            !textElement ||
            !hiddenInput ||
            !menu
        ) {
            return;
        }


        const options =
            menu.querySelectorAll(
                ".stackly-youth-custom-dropdown-option"
            );


        /* =================================================
           OPEN DROPDOWN
        ================================================== */

        function openDropdown() {

            closeAllYouthDropdowns(dropdown);

            dropdown.classList.add("open");

            trigger.setAttribute(
                "aria-expanded",
                "true"
            );
        }


        /* =================================================
           CLOSE DROPDOWN
        ================================================== */

        function closeDropdown() {

            dropdown.classList.remove("open");

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        /* =================================================
           TRIGGER CLICK
        ================================================== */

        trigger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    dropdown.classList.contains("open");

                closeAllYouthDropdowns();

                if (!isOpen) {
                    openDropdown();
                }
            }
        );


        /* =================================================
           OPTION CLICK
        ================================================== */

        options.forEach(function (option) {

            option.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    const value =
                        option.getAttribute("data-value");

                    const label =
                        option.querySelector("strong");

                    if (!value) {
                        return;
                    }


                    /* SAVE VALUE */

                    hiddenInput.value =
                        value.toLowerCase();


                    /* UPDATE VISIBLE LABEL */

                    if (label) {
                        textElement.textContent =
                            label.textContent.trim();
                    }


                    /* SELECTED STATE */

                    options.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-selected",
                                "false"
                            );
                        }
                    );

                    option.classList.add("selected");

                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* VALUE STATE */

                    dropdown.classList.add(
                        "has-value"
                    );


                    /* REMOVE ERROR */

                    dropdown.classList.remove(
                        "stackly-youth-custom-dropdown-error"
                    );

                    trigger.classList.remove(
                        "stackly-youth-input-error"
                    );


                    /* CLOSE */

                    closeDropdown();
                }
            );

        });


        /* =================================================
           TRIGGER KEYBOARD
        ================================================== */

        trigger.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    trigger.click();
                }


                if (event.key === "ArrowDown") {

                    event.preventDefault();

                    openDropdown();

                    if (options.length > 0) {
                        options[0].focus();
                    }
                }


                if (event.key === "Escape") {

                    event.preventDefault();

                    closeDropdown();
                }
            }
        );


        /* =================================================
           OPTION KEYBOARD
        ================================================== */

        options.forEach(
            function (option, index) {

                option.addEventListener(
                    "keydown",
                    function (event) {

                        /* ENTER / SPACE */

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            option.click();

                            trigger.focus();
                        }


                        /* ARROW DOWN */

                        if (
                            event.key === "ArrowDown"
                        ) {

                            event.preventDefault();

                            const nextOption =
                                options[index + 1];

                            if (nextOption) {
                                nextOption.focus();
                            }
                        }


                        /* ARROW UP */

                        if (
                            event.key === "ArrowUp"
                        ) {

                            event.preventDefault();

                            const previousOption =
                                options[index - 1];

                            if (previousOption) {

                                previousOption.focus();

                            } else {

                                trigger.focus();
                            }
                        }


                        /* ESCAPE */

                        if (
                            event.key === "Escape"
                        ) {

                            event.preventDefault();

                            closeDropdown();

                            trigger.focus();
                        }
                    }
                );
            }
        );


        /* =================================================
           INITIAL ARIA STATE
        ================================================== */

        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

        options.forEach(function (option) {

            if (
                !option.hasAttribute(
                    "aria-selected"
                )
            ) {

                option.setAttribute(
                    "aria-selected",
                    "false"
                );
            }
        });
    }


    /* =====================================================
       INITIALIZE LOGIN DROPDOWN
    ====================================================== */

    initYouthCustomDropdown(
        loginRoleDropdown,
        loginRoleTrigger,
        loginRoleText,
        loginRoleInput,
        loginRoleMenu
    );


    /* =====================================================
       INITIALIZE SIGNUP DROPDOWN
    ====================================================== */

    initYouthCustomDropdown(
        signupRoleDropdown,
        signupRoleTrigger,
        signupRoleText,
        signupRoleInput,
        signupRoleMenu
    );


    /* =====================================================
       OUTSIDE CLICK — CLOSE DROPDOWNS
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    ".stackly-youth-custom-dropdown"
                )
            ) {

                closeAllYouthDropdowns();
            }
        }
    );


    /* =====================================================
       ESCAPE — CLOSE DROPDOWNS
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeAllYouthDropdowns();
            }
        }
    );


    /* =====================================================
       RESET CUSTOM DROPDOWN
    ====================================================== */

    function resetYouthCustomDropdown(
        dropdown,
        trigger,
        textElement,
        hiddenInput,
        menu
    ) {

        if (
            !dropdown ||
            !trigger ||
            !textElement ||
            !hiddenInput ||
            !menu
        ) {
            return;
        }


        hiddenInput.value = "";


        textElement.textContent =
            "Select your role";


        dropdown.classList.remove(
            "has-value"
        );

        dropdown.classList.remove(
            "stackly-youth-custom-dropdown-error"
        );

        dropdown.classList.remove("open");


        trigger.classList.remove(
            "stackly-youth-input-error"
        );


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );


        menu
            .querySelectorAll(
                ".stackly-youth-custom-dropdown-option"
            )
            .forEach(function (option) {

                option.classList.remove(
                    "selected"
                );

                option.setAttribute(
                    "aria-selected",
                    "false"
                );
            });
    }


    /* =====================================================
       SET CUSTOM DROPDOWN VALUE
    ====================================================== */

    function setYouthCustomDropdownValue(
        dropdown,
        trigger,
        textElement,
        hiddenInput,
        menu,
        value
    ) {

        if (
            !dropdown ||
            !trigger ||
            !textElement ||
            !hiddenInput ||
            !menu
        ) {
            return;
        }


        if (!value) {

            resetYouthCustomDropdown(
                dropdown,
                trigger,
                textElement,
                hiddenInput,
                menu
            );

            return;
        }


        const normalizedValue =
            value.trim().toLowerCase();


        const options =
            menu.querySelectorAll(
                ".stackly-youth-custom-dropdown-option"
            );


        let matchedOption = null;


        options.forEach(function (option) {

            const optionValue =
                option.getAttribute("data-value");


            if (
                optionValue &&
                optionValue.toLowerCase() ===
                normalizedValue
            ) {

                matchedOption = option;
            }
        });


        if (!matchedOption) {
            return;
        }


        const label =
            matchedOption.querySelector("strong");


        hiddenInput.value =
            normalizedValue;


        if (label) {

            textElement.textContent =
                label.textContent.trim();
        }


        dropdown.classList.add(
            "has-value"
        );


        dropdown.classList.remove(
            "stackly-youth-custom-dropdown-error"
        );


        trigger.classList.remove(
            "stackly-youth-input-error"
        );


        options.forEach(function (option) {

            option.classList.remove(
                "selected"
            );

            option.setAttribute(
                "aria-selected",
                "false"
            );
        });


        matchedOption.classList.add(
            "selected"
        );


        matchedOption.setAttribute(
            "aria-selected",
            "true"
        );
    }


    /* =====================================================
       LOGIN / SIGNUP TAB SWITCH
    ====================================================== */

    function showLogin() {

        if (loginTab) {

            loginTab.classList.add("active");

            loginTab.setAttribute(
                "aria-selected",
                "true"
            );
        }


        if (signupTab) {

            signupTab.classList.remove("active");

            signupTab.setAttribute(
                "aria-selected",
                "false"
            );
        }


        if (loginForm) {
            loginForm.classList.add("active");
        }


        if (signupForm) {
            signupForm.classList.remove("active");
        }


        if (authTitle) {

            authTitle.textContent =
                "Welcome Back";
        }


        if (authSubtitle) {

            authSubtitle.textContent =
                "Sign in to continue to your account.";
        }


        clearMessage(loginMessage);
        clearMessage(signupMessage);

        closeAllYouthDropdowns();
    }


    function showSignup() {

        if (signupTab) {

            signupTab.classList.add("active");

            signupTab.setAttribute(
                "aria-selected",
                "true"
            );
        }


        if (loginTab) {

            loginTab.classList.remove("active");

            loginTab.setAttribute(
                "aria-selected",
                "false"
            );
        }


        if (signupForm) {
            signupForm.classList.add("active");
        }


        if (loginForm) {
            loginForm.classList.remove("active");
        }


        if (authTitle) {

            authTitle.textContent =
                "Create Your Account";
        }


        if (authSubtitle) {

            authSubtitle.textContent =
                "Join our community and make a difference.";
        }


        clearMessage(loginMessage);
        clearMessage(signupMessage);

        closeAllYouthDropdowns();
    }


    /* =====================================================
       TAB EVENTS
    ====================================================== */

    if (loginTab) {

        loginTab.addEventListener(
            "click",
            showLogin
        );
    }


    if (signupTab) {

        signupTab.addEventListener(
            "click",
            showSignup
        );
    }


    /* =====================================================
       ACCOUNT SWITCH BUTTONS
    ====================================================== */

    const goSignup =
        document.getElementById(
            "stacklyYouthGoSignup"
        );

    const goLogin =
        document.getElementById(
            "stacklyYouthGoLogin"
        );


    if (goSignup) {

        goSignup.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSignup();
            }
        );
    }


    if (goLogin) {

        goLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showLogin();
            }
        );
    }


    /* =====================================================
       PASSWORD EYE TOGGLE
    ====================================================== */

    const passwordToggleButtons =
        document.querySelectorAll(
            ".stackly-youth-password-toggle"
        );


    passwordToggleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const targetId =
                        button.getAttribute(
                            "data-target"
                        );


                    const passwordInput =
                        document.getElementById(
                            targetId
                        );


                    const icon =
                        button.querySelector("i");


                    if (
                        !passwordInput ||
                        !icon
                    ) {
                        return;
                    }


                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";


                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );


                        button.setAttribute(
                            "aria-label",
                            "Hide password"
                        );

                    } else {

                        passwordInput.type =
                            "password";


                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );


                        button.setAttribute(
                            "aria-label",
                            "Show password"
                        );
                    }
                }
            );
        }
    );


    /* =====================================================
       VALIDATION HELPERS
    ====================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailPattern.test(email);
    }


    function isValidName(name) {

        const namePattern =
            /^[A-Za-z]+(?:[\s'-][A-Za-z]+)*$/;

        return namePattern.test(
            name.trim()
        );
    }


    /* =====================================================
       LOCAL STORAGE — GET USERS
    ====================================================== */

    function getUsers() {

        try {

            const users =
                localStorage.getItem(
                    USERS_KEY
                );


            return users
                ? JSON.parse(users)
                : [];

        } catch (error) {

            console.error(
                "Unable to read users:",
                error
            );

            return [];
        }
    }


    /* =====================================================
       LOCAL STORAGE — SAVE USERS
    ====================================================== */

    function saveUsers(users) {

        try {

            localStorage.setItem(
                USERS_KEY,
                JSON.stringify(users)
            );

        } catch (error) {

            console.error(
                "Unable to save users:",
                error
            );
        }
    }


    /* =====================================================
       MESSAGE FUNCTIONS
    ====================================================== */

    function showMessage(
        element,
        message,
        type
    ) {

        if (!element) {
            return;
        }


        element.textContent =
            message;


        element.className =
            "stackly-youth-auth-message " +
            type;
    }


    function clearMessage(element) {

        if (!element) {
            return;
        }


        element.textContent = "";


        element.className =
            "stackly-youth-auth-message";
    }


    /* =====================================================
       NORMAL INPUT ERROR
    ====================================================== */

    function markInputError(input) {

        if (!input) {
            return;
        }


        input.classList.add(
            "stackly-youth-input-error"
        );
    }


    /* =====================================================
       CUSTOM DROPDOWN ERROR
    ====================================================== */

    function markDropdownError(
        dropdown,
        trigger
    ) {

        if (dropdown) {

            dropdown.classList.add(
                "stackly-youth-custom-dropdown-error"
            );
        }


        if (trigger) {

            trigger.classList.add(
                "stackly-youth-input-error"
            );
        }
    }


    /* =====================================================
       REMOVE DROPDOWN ERROR
    ====================================================== */

    function clearDropdownError(
        dropdown,
        trigger
    ) {

        if (dropdown) {

            dropdown.classList.remove(
                "stackly-youth-custom-dropdown-error"
            );
        }


        if (trigger) {

            trigger.classList.remove(
                "stackly-youth-input-error"
            );
        }
    }


    /* =====================================================
       LOGIN FORM
       
       IMPORTANT:
       Login does NOT require the email to exist in
       stacklyYouthUsers.

       If:
       - role is admin/client
       - email format is valid
       - password is at least 6 characters

       the user is redirected directly.
    ====================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearMessage(
                    loginMessage
                );


                /* =========================================
                   LOGIN ELEMENTS
                ========================================== */

                const roleInput =
                    document.getElementById(
                        "stacklyYouthLoginRole"
                    );


                const emailInput =
                    document.getElementById(
                        "stacklyYouthLoginEmail"
                    );


                const passwordInput =
                    document.getElementById(
                        "stacklyYouthLoginPassword"
                    );


                const rememberInput =
                    document.getElementById(
                        "stacklyYouthRemember"
                    );


                /* =========================================
                   VALUES
                ========================================== */

                const role =
                    roleInput
                        ? roleInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                const remember =
                    rememberInput
                        ? rememberInput.checked
                        : false;


                /* =========================================
                   ROLE VALIDATION
                ========================================== */

                if (!role) {

                    showMessage(
                        loginMessage,
                        "Please select your account role.",
                        "error"
                    );


                    markDropdownError(
                        loginRoleDropdown,
                        loginRoleTrigger
                    );


                    if (loginRoleTrigger) {
                        loginRoleTrigger.focus();
                    }


                    return;
                }


                if (
                    role !== "admin" &&
                    role !== "client"
                ) {

                    showMessage(
                        loginMessage,
                        "Please select a valid account role.",
                        "error"
                    );


                    markDropdownError(
                        loginRoleDropdown,
                        loginRoleTrigger
                    );


                    return;
                }


                clearDropdownError(
                    loginRoleDropdown,
                    loginRoleTrigger
                );


                /* =========================================
                   EMAIL EMPTY
                ========================================== */

                if (!email) {

                    showMessage(
                        loginMessage,
                        "Please enter your email address.",
                        "error"
                    );


                    markInputError(
                        emailInput
                    );


                    if (emailInput) {
                        emailInput.focus();
                    }


                    return;
                }


                /* =========================================
                   EMAIL FORMAT
                ========================================== */

                if (!isValidEmail(email)) {

                    showMessage(
                        loginMessage,
                        "Please enter a valid email address.",
                        "error"
                    );


                    markInputError(
                        emailInput
                    );


                    if (emailInput) {
                        emailInput.focus();
                    }


                    return;
                }


                /* =========================================
                   PASSWORD EMPTY
                ========================================== */

                if (!password) {

                    showMessage(
                        loginMessage,
                        "Please enter your password.",
                        "error"
                    );


                    markInputError(
                        passwordInput
                    );


                    if (passwordInput) {
                        passwordInput.focus();
                    }


                    return;
                }


                /* =========================================
                   PASSWORD LENGTH
                ========================================== */

                if (password.length < 6) {

                    showMessage(
                        loginMessage,
                        "Password must be at least 6 characters.",
                        "error"
                    );


                    markInputError(
                        passwordInput
                    );


                    if (passwordInput) {
                        passwordInput.focus();
                    }


                    return;
                }


                /* =========================================
                   SAVE LOGIN DETAILS
                ========================================== */

                localStorage.setItem(
                    LOGIN_EMAIL_KEY,
                    email
                );


                localStorage.setItem(
                    LOGIN_ROLE_KEY,
                    role
                );


                localStorage.setItem(
                    LOGIN_STATUS_KEY,
                    "true"
                );


                /* =========================================
                   REMEMBER ME
                ========================================== */

                if (remember) {

                    localStorage.setItem(
                        REMEMBER_KEY,
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        REMEMBER_KEY
                    );
                }


                /* =========================================
                   SUCCESS MESSAGE
                ========================================== */

                showMessage(
                    loginMessage,
                    "Login successful. Redirecting...",
                    "success"
                );


                /* =========================================
                   DIRECT ROLE-BASED REDIRECT
                ========================================== */

                setTimeout(
                    function () {

                        if (role === "admin") {

                            window.location.href =
                                "admin.html";

                        } else if (
                            role === "client"
                        ) {

                            window.location.href =
                                "client.html";
                        }

                    },
                    700
                );
            }
        );
    }


    /* =====================================================
       SIGNUP FORM
    ====================================================== */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearMessage(
                    signupMessage
                );


                /* =========================================
                   SIGNUP ELEMENTS
                ========================================== */

                const nameInput =
                    document.getElementById(
                        "stacklyYouthSignupName"
                    );


                const roleInput =
                    document.getElementById(
                        "stacklyYouthSignupRole"
                    );


                const emailInput =
                    document.getElementById(
                        "stacklyYouthSignupEmail"
                    );


                const passwordInput =
                    document.getElementById(
                        "stacklyYouthSignupPassword"
                    );


                const confirmPasswordInput =
                    document.getElementById(
                        "stacklyYouthSignupConfirmPassword"
                    );


                const termsInput =
                    document.getElementById(
                        "stacklyYouthTerms"
                    );


                /* =========================================
                   VALUES
                ========================================== */

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const role =
                    roleInput
                        ? roleInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                const confirmPassword =
                    confirmPasswordInput
                        ? confirmPasswordInput.value
                        : "";


                const terms =
                    termsInput
                        ? termsInput.checked
                        : false;


                /* =========================================
                   NAME EMPTY
                ========================================== */

                if (!name) {

                    showMessage(
                        signupMessage,
                        "Please enter your full name.",
                        "error"
                    );


                    markInputError(
                        nameInput
                    );


                    if (nameInput) {
                        nameInput.focus();
                    }


                    return;
                }


                /* =========================================
                   NAME FORMAT
                ========================================== */

                if (!isValidName(name)) {

                    showMessage(
                        signupMessage,
                        "Please enter a valid name.",
                        "error"
                    );


                    markInputError(
                        nameInput
                    );


                    if (nameInput) {
                        nameInput.focus();
                    }


                    return;
                }


                /* =========================================
                   ROLE EMPTY
                ========================================== */

                if (!role) {

                    showMessage(
                        signupMessage,
                        "Please select your account role.",
                        "error"
                    );


                    markDropdownError(
                        signupRoleDropdown,
                        signupRoleTrigger
                    );


                    if (signupRoleTrigger) {
                        signupRoleTrigger.focus();
                    }


                    return;
                }


                /* =========================================
                   VALID ROLE
                ========================================== */

                if (
                    role !== "admin" &&
                    role !== "client"
                ) {

                    showMessage(
                        signupMessage,
                        "Please select a valid account role.",
                        "error"
                    );


                    markDropdownError(
                        signupRoleDropdown,
                        signupRoleTrigger
                    );


                    return;
                }


                clearDropdownError(
                    signupRoleDropdown,
                    signupRoleTrigger
                );


                /* =========================================
                   EMAIL EMPTY
                ========================================== */

                if (!email) {

                    showMessage(
                        signupMessage,
                        "Please enter your email address.",
                        "error"
                    );


                    markInputError(
                        emailInput
                    );


                    if (emailInput) {
                        emailInput.focus();
                    }


                    return;
                }


                /* =========================================
                   EMAIL FORMAT
                ========================================== */

                if (!isValidEmail(email)) {

                    showMessage(
                        signupMessage,
                        "Please enter a valid email address.",
                        "error"
                    );


                    markInputError(
                        emailInput
                    );


                    if (emailInput) {
                        emailInput.focus();
                    }


                    return;
                }


                /* =========================================
                   PASSWORD EMPTY
                ========================================== */

                if (!password) {

                    showMessage(
                        signupMessage,
                        "Please create a password.",
                        "error"
                    );


                    markInputError(
                        passwordInput
                    );


                    if (passwordInput) {
                        passwordInput.focus();
                    }


                    return;
                }


                /* =========================================
                   PASSWORD LENGTH
                ========================================== */

                if (password.length < 6) {

                    showMessage(
                        signupMessage,
                        "Password must be at least 6 characters.",
                        "error"
                    );


                    markInputError(
                        passwordInput
                    );


                    if (passwordInput) {
                        passwordInput.focus();
                    }


                    return;
                }


                /* =========================================
                   CONFIRM PASSWORD EMPTY
                ========================================== */

                if (!confirmPassword) {

                    showMessage(
                        signupMessage,
                        "Please confirm your password.",
                        "error"
                    );


                    markInputError(
                        confirmPasswordInput
                    );


                    if (confirmPasswordInput) {
                        confirmPasswordInput.focus();
                    }


                    return;
                }


                /* =========================================
                   PASSWORD MATCH
                ========================================== */

                if (
                    password !==
                    confirmPassword
                ) {

                    showMessage(
                        signupMessage,
                        "Passwords do not match.",
                        "error"
                    );


                    markInputError(
                        confirmPasswordInput
                    );


                    if (confirmPasswordInput) {
                        confirmPasswordInput.focus();
                    }


                    return;
                }


                /* =========================================
                   TERMS
                ========================================== */

                if (!terms) {

                    showMessage(
                        signupMessage,
                        "Please agree to the Terms & Conditions and Privacy Policy.",
                        "error"
                    );


                    if (termsInput) {
                        termsInput.focus();
                    }


                    return;
                }


                /* =========================================
                   GET USERS
                ========================================== */

                const users =
                    getUsers();


                /* =========================================
                   DUPLICATE EMAIL
                ========================================== */

                const existingUser =
                    users.find(
                        function (user) {

                            return (
                                user.email &&
                                user.email.toLowerCase() ===
                                email
                            );
                        }
                    );


                if (existingUser) {

                    showMessage(
                        signupMessage,
                        "An account with this email already exists.",
                        "error"
                    );


                    markInputError(
                        emailInput
                    );


                    if (emailInput) {
                        emailInput.focus();
                    }


                    return;
                }


                /* =========================================
                   CREATE USER
                ========================================== */

                const newUser = {

                    id:
                        "youth-" +
                        Date.now(),

                    name:
                        name,

                    role:
                        role,

                    email:
                        email,

                    password:
                        password,

                    createdAt:
                        new Date().toISOString()
                };


                /* =========================================
                   SAVE USER
                ========================================== */

                users.push(newUser);

                saveUsers(users);


                /* =========================================
                   SUCCESS MESSAGE
                ========================================== */

                showMessage(
                    signupMessage,
                    "Account created successfully. Please login.",
                    "success"
                );


                /* =========================================
                   RESET SIGNUP FORM
                ========================================== */

                signupForm.reset();


                /* =========================================
                   RESET SIGNUP CUSTOM DROPDOWN
                ========================================== */

                resetYouthCustomDropdown(
                    signupRoleDropdown,
                    signupRoleTrigger,
                    signupRoleText,
                    signupRoleInput,
                    signupRoleMenu
                );


                /* =========================================
                   SWITCH TO LOGIN
                ========================================== */

                setTimeout(
                    function () {

                        showLogin();


                        /* =================================
                           PREFILL LOGIN EMAIL
                        ================================== */

                        const loginEmail =
                            document.getElementById(
                                "stacklyYouthLoginEmail"
                            );


                        if (loginEmail) {

                            loginEmail.value =
                                email;
                        }


                        /* =================================
                           PREFILL LOGIN ROLE
                        ================================== */

                        setYouthCustomDropdownValue(
                            loginRoleDropdown,
                            loginRoleTrigger,
                            loginRoleText,
                            loginRoleInput,
                            loginRoleMenu,
                            role
                        );


                        /* =================================
                           LOGIN SUCCESS MESSAGE
                        ================================== */

                        showMessage(
                            loginMessage,
                            "Your account is ready. Please sign in.",
                            "success"
                        );

                    },
                    1000
                );
            }
        );
    }


    /* =====================================================
       REMOVE INPUT ERROR WHEN USER TYPES
    ====================================================== */

    const allInputs =
        document.querySelectorAll(
            ".stackly-youth-auth-form input"
        );


    allInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    input.classList.remove(
                        "stackly-youth-input-error"
                    );
                }
            );


            input.addEventListener(
                "change",
                function () {

                    input.classList.remove(
                        "stackly-youth-input-error"
                    );
                }
            );
        }
    );


    /* =====================================================
       EMAIL — REMOVE SPACES
    ====================================================== */

    const emailInputs =
        document.querySelectorAll(
            'input[type="email"]'
        );


    emailInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    input.value =
                        input.value.replace(
                            /\s/g,
                            ""
                        );
                }
            );
        }
    );


    /* =====================================================
       NAME INPUT
       
       ALLOW:
       - A-Z
       - a-z
       - spaces
       - apostrophes
       - hyphens
    ====================================================== */

    const signupName =
        document.getElementById(
            "stacklyYouthSignupName"
        );


    if (signupName) {

        signupName.addEventListener(
            "input",
            function () {

                signupName.value =
                    signupName.value.replace(
                        /[^A-Za-z\s'-]/g,
                        ""
                    );
            }
        );
    }


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    showLogin();

});