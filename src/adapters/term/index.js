import Base from "./base";
import Pc from "./pc";
import Mobile from "./mobile";
import Micro from "./micro";

class TermAdapter {}
Object.defineProperties(TermAdapter, {
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
      else if (Pc.Match()) this.inst = new Pc();
      else if (Mobile.Match()) this.inst = new Mobile();
      else if (Micro.Match()) this.inst = new Micro();
      else if (Base.Match()) this.inst = new Base();
      console.log('this.inst:',this.inst)
      return this.inst;
    },
  },
});
export default TermAdapter;
