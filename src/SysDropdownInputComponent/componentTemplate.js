export default `
  <div class="main-container">
    <div class="label-with-dropdown-input-container">
      <div cl-element="label"
           cl-inline-edit="content, label"
           class="label">
      </div>
      <div class="dropdown-input-with-tooltip">
        <div class="dropdown-input-select-button">
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10.5248 1.90196L9.57381 2.71322L6.05712 5.71322L5.24395 6.40691L4.4324 5.71132L0.949088 2.72576L0 1.91229L1.62694 0.0141139L2.57603 0.827583L5.24778 3.11756L7.9513 0.811257L8.90228 0L10.5248 1.90196Z"
                  fill="currentColor"/>
          </svg>
        </div>
        <!--"one-time-code" disables autofill in chromium-->
        <input cl-element="input"
             class="dropdown-label"
             autocomplete="one-time-code"
             placeholder="placeholder"/>
        <div class="input-tooltip">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 13.0604C1.5 19.4116 6.6481 24.5605 13.0075 24.5605C19.353 24.5605 24.5 19.4107 24.5 13.0604C24.5 6.70865 19.3531 1.55909 13.0075 1.55908C6.64806 1.55908 1.5 6.7077 1.5 13.0604ZM12.9775 17.9668C12.7032 17.9668 12.4807 17.7443 12.4807 17.47C12.4807 17.1956 12.7032 16.9732 12.9775 16.9732C13.2519 16.9732 13.4743 17.1956 13.4743 17.47C13.4743 17.7443 13.2519 17.9668 12.9775 17.9668ZM12.9775 13.4764C12.7032 13.4764 12.4807 13.254 12.4807 12.9796L12.4807 8.48924C12.4807 8.21487 12.7032 7.99245 12.9775 7.99245C13.2519 7.99245 13.4743 8.21487 13.4743 8.48924L13.4743 12.9796C13.4743 13.254 13.2519 13.4764 12.9775 13.4764Z" fill="#FF0000" stroke="white" stroke-width="2"></path>
          </svg>
        </div>
      </div>
    </div>
    </div>
`;
