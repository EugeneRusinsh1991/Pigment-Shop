# Task Spec: [TASK-002d1] Storefront Auth, Profile & Contact Inputs

## Metadata & Model Recommendation
- **Task ID**: TASK-002d1
- **Complexity Rating**: 2 / 5
- **Recommended Agent Model**: 🟢 **Gemini 3.6 Flash (Medium)**
- **Prerequisite Tasks**: `task-001d4-admin-categories-banners-buttons.md`
- **Dependent Tasks**: `task-002d2-storefront-search-catalog-cart-inputs.md`
- **Target Files**:
  - `src/features/auth/LoginPage.js`
  - `src/features/auth/LoginPageComponents.js`
  - `src/features/profile/ProfileFormCard.js`
  - `src/features/contact/ContactQuestionForm.js`
  - `src/features/contact/ContactPageStyles.js`

## Light Model Prompt Instruction
"Refactor raw `<TextInput>` fields in Auth (LoginPage, LoginPageComponents), Profile (ProfileFormCard), and Contact (ContactQuestionForm) to use standardized `<FieldInput>` / `<FieldTextarea>` primitives from `SharedFormComponents.js` with support for error states and theme tokens."

## 🧪 Manual UI Verification Guide (Where to Test)
- **App Screen**: Login, Profile, Contact Us
- **User Action**: Focus inputs, trigger validation errors (e.g. empty submission), and type in login/profile/contact form fields.
- **Expected Result**: Standardized input borders, padding, focus styles, and error highlighting across Storefront auth, profile, and contact forms.
