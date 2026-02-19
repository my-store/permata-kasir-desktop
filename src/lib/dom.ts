/* ===========================================================
|  LIBRARY - DOM MANAGER
|  ===========================================================
|  Disini berisi metode manipulasi dom, di antaranya:
|  1. Melakukan pembacaan file/ foto dari input[type="file"]\
|  2. Melakukan pengecekan empty-value pada input didalam form
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Feb-2026
|  Updated At: 19-Feb-2026
*/

import { JqueryDomPropertySelectorInterface } from "./interfaces/dom.interface";
import { ChangeEvent } from "react";
import $ from "jquery";

export function readImage(e: ChangeEvent<HTMLInputElement>, c: Function): any {
  const file = e.target.files;
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function () {
      c(reader.result);
    };
    reader.readAsDataURL(file[0]);
  }
}

export function emptyInputCheck(parent: string) {
  // Default result status and message value
  let result: any = {
    status: true,
    message: "",
  };

  // Jquery property selector name, operator and value
  let propertySelector: JqueryDomPropertySelectorInterface[] = [
    {
      propertyName: "type",
      propertyOperator: "!=",
      propertyValue: "checkbox",
    },
    {
      propertyName: "type",
      propertyOperator: "!=",
      propertyValue: "radio",
    },
    {
      propertyName: "type",
      propertyOperator: "!=",
      propertyValue: "file",
    },
  ];

  // Set selector name
  let selector: string = `${parent} input`;

  // Modify selector name as:
  // parent input[<PN><PO><PV>][<OTHER_PN><OTHER_PO><OTHER_PV>]
  // Example: #root-form input[type="text"][type!="file"][name="email"][and-so-on]
  for (let ps of propertySelector) {
    selector += "[";
    selector += ps.propertyName;
    selector += ps.propertyOperator;
    selector += `"${ps.propertyValue}"`;
    selector += "]";
  }

  // Get all inputs type except radio, checkbox and file.
  const inputs: any = $(selector);

  for (let i of inputs) {
    // Jika input kosong
    if ($(i).val().length < 1) {
      // Ambil label sebagai nama dari input tersebut
      const label = $(i).parent().children()[0];
      // Make sure the label is detected by jquery dom selector
      if (label) {
        result.message = `Mohon isi ${label.textContent}!`;
        result.status = false;
        break;
      }
    }
  }

  // Return the result status and message
  return result;
}

export function getInputs(parent: string): any {
  // Detected input default value
  let inputFound: any = {};

  // Try to find/ detect all input inside the parent
  const inputs: JQuery<HTMLInputElement[] | any> = $(`${parent} input`);

  for (let i of inputs) {
    // Get the input name
    const inputName: string = $(i).prop("name");
    // Check if input is not file
    const notFile: boolean = $(i).prop("type") != "file";
    // Set input key name with its input object,
    // for file input need to add [0] at the end.
    inputFound[inputName] = notFile ? $(i) : $(i)[0];
  }

  return inputFound;
}
