export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    page: number;
    selected: boolean;
    edit: boolean;

    constructor(id, name, email, role, page) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.page = page;
        this.selected = false;
        this.edit = false;
    }
}
