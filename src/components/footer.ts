import { html } from "lit";

const template = () => html`
  <footer class="border-top bd-footer p-2 mt-5 bg-light">
    <div class="container p-3">
      <div class="row">
        <div>
          <a class="text-muted" href="https://skku.edu" target="_blank">
            Sungkyunkwan University
          </a>
        </div>
        <div>
          <a class="text-muted" href="https://cs.skku.edu" target="_blank">
            College of Computing and Informatics
          </a>
        </div>
        <div>
          <a class="text-muted" href="https://idclab.skku.edu" target="_blank">
            Interactive Data Computing Laboratory
            <span class="idc">(IDC</span>
            <span class="lab">Lab)</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
`;

export default template;
