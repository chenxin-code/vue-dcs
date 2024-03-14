import Base from "./base";
import Dev from "./dev";
import Prod from "./prod";

class EnvAdapter {}
Object.defineProperties(EnvAdapter, {
  inst: {
    enumerable: false,
    configurable: false,
    value: null,
    writable: true,
  },
  Inst: {
    enumerable: true,
    configurable: false,
    get() {
      if (this.inst) return this.inst;
      else if (Dev.Match()) this.inst = new Dev();
      else if (Prod.Match()) this.inst = new Prod();
      else if (Base.Match()) this.inst = new Base();
      return this.inst;
    },
  },
  IsProd: {
    enumerable: true,
    configurable: false,
    get() {
      return Prod.Match();
    }
  },
});
export default EnvAdapter;
