import { Component, OnInit } from "@angular/core"

@Component({
    selector: "app-footer",
    template: `
        <footer>
            <div class="content">&copy; Pedro Frohmut 2022</div>
        </footer>
    `,
    styles: [
        `
            footer {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .content {
                text-align: center;
                color: var(--gray-500);
            }
        `
    ]
})
export class FooterComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
