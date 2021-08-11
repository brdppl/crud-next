export class News {
    private _id: string = ''
    private _title: string = ''
    private _author: string = ''
    private _content: string = ''
    private _img: string = ''
    private _active: boolean = false
    private _createdAt: Date = new Date('')
    private _updatedAt: Date = new Date('')
    
    public get id(): string {
        return this._id
    }
    
    public get title(): string {
        return this._title
    }
    
    public get author(): string {
        return this._author
    }
    
    public get content(): string {
        return this._content
    }
    
    public get img(): string {
        return this._img
    }
    
    public get active(): boolean {
        return this._active
    }
    
    public get createdAt(): Date {
        return this._createdAt
    }
    
    public get updatedAt(): Date {
        return this._updatedAt
    }
    
    
    public set id(id: string) {
        this._id = id
    }
    
    public set title(title: string) {
        this._title = title
    }
    
    public set author(author: string) {
        this._author = author
    }
    
    public set content(content: string) {
        this._content = content
    }
    
    public set img(img: string) {
        this._img = img
    }
    
    public set active(active: boolean) {
        this._active = active
    }
    
    public set createdAt(createdAt: Date) {
        this._createdAt = createdAt
    }
    
    public set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt
    }
}