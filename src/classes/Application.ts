// import "reflect-metadata";
// import { Container } from "inversify";
// import ApplicationInterface from "./ApplicationInterface";

// declare global {
//     type AnyClass = { new (): any };
// }

// export default class Application implements ApplicationInterface {
    
//     protected app;

//     protected container: Container;

//     consutrctor() {
//         this.app = this;
//         globalThis.$app = this.app;
//         this.container = new Container();
//         this.constant("app", this.app);
//     }

//     public async boot(): Promise<ApplicationInterface> {
//         return this;
//     }

//     public getContainer() {
//         return this.container;
//     }

//     public bind<T>(abstract: string, concrete: AnyClass) {
//         this.container.bind(abstract).to(concrete)
//     }
    
//     public constant(key: string, constant: any) {
//         this.container.bind(key).toConstantValue(constant);
//     }
// }