export default interface ApplicationInterface {
    boot(): any;
    constant(key: string, constant: any): void;
    bind<T>(abstract: string, concrete: any): void;
}