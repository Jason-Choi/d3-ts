import { html } from "lit";

const template = () => html`
<footer class="footer p-10 bg-base-300">
    <div>
        <span class="footer-title">About</span>
        <a href="https://idclab.skku.edu" target="_blank">
            Interactive Data Computing Laboratory
            <span class="idc">(IDC</span>
            <span class="lab">Lab)</span>
        </a>
        <a href="https://skku.edu">Sungkyunkwan University</a>
        <a href="https://cs.skku.edu">College of Computing and Informatics</a>
    </div>
    <div>
        <span class="footer-title">Contact</span>
        <a href="mailto:jasonchoi3@g.skku.edu">Jason Choi (jasoncho3@g.skku.edu)</a>
    </div>
</footer>
`;

export default template;
