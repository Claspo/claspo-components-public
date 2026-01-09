export default function getTemplate() {
  return `
    <div class="main-container">
        <div class="label-and-controls-container">
      
          <div cl-element="label"
             cl-inline-edit="content, label"
             class="label">
          </div>
      
          <div class="cl-calendar-input-control">
            <input id="cl-date-input"
                   type="date"
                   name="date">
      
              <div class="input-ui-override" cl-element="input">
                <span class="selected-date-value"></span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     class="calendar-icon">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.625 5H16.375C18.4696 5 20 6.76142 20 8.71429V16.2857C20 18.2371 18.4702 20 16.375 20H7.625C5.52975 20 4 18.2371 4 16.2857V8.71429C4 6.76142 5.53037 5 7.625 5ZM7.625 7H16.375C17.2688 7 18 7.76716 18 8.71429V16.2857C18 17.232 17.2688 18 16.375 18H7.625C6.73125 18 6 17.232 6 16.2857V8.71429C6 7.76716 6.73125 7 7.625 7Z"
                        fill="currentColor"/>
                  <path d="M8 3H10V5H8V3Z" fill="currentColor"/>
                  <path d="M14 3H16V5H14V3Z" fill="currentColor"/>
                  <path d="M10.125 10H8.125V12H10.125V10Z" fill="currentColor"/>
                  <path d="M13.125 10H11.125V12H13.125V10Z" fill="currentColor"/>
                  <path d="M8.125 13H10.125V15H8.125V13Z" fill="currentColor"/>
                  <path d="M13.125 13H11.125V15H13.125V13Z" fill="currentColor"/>
                  <path d="M14.125 10H16.125V12H14.125V10Z" fill="currentColor"/>
                </svg>
              </div>
      
              <div class="input-tooltip">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 13.0604C1.5 19.4116 6.6481 24.5605 13.0075 24.5605C19.353 24.5605 24.5 19.4107 24.5 13.0604C24.5 6.70865 19.3531 1.55909 13.0075 1.55908C6.64806 1.55908 1.5 6.7077 1.5 13.0604ZM12.9775 17.9668C12.7032 17.9668 12.4807 17.7443 12.4807 17.47C12.4807 17.1956 12.7032 16.9732 12.9775 16.9732C13.2519 16.9732 13.4743 17.1956 13.4743 17.47C13.4743 17.7443 13.2519 17.9668 12.9775 17.9668ZM12.9775 13.4764C12.7032 13.4764 12.4807 13.254 12.4807 12.9796L12.4807 8.48924C12.4807 8.21487 12.7032 7.99245 12.9775 7.99245C13.2519 7.99245 13.4743 8.21487 13.4743 8.48924L13.4743 12.9796C13.4743 13.254 13.2519 13.4764 12.9775 13.4764Z" fill="#FF0000" stroke="white" stroke-width="2"></path>
                </svg>
              </div>
            </div>
        </div>
      </div>
  `;
}
