import { CartFont } from "./CartFont";
export function getAllButtonElement(obj) {
  const btn = obj.getElementsByTagName("button");
  return btn;
}
export const Icon = ({ name }) => {
  return (
    <span className="c-icon">{String.fromCharCode(parseInt(name, 16))}</span>
  );
};
