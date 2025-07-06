/* import {useRef, useState} from "react";
export function useValidation(initialFields =[]) {
    const inputsRef = useRef({});
    const [formIsValid, setFormIsValid] = useState(false);

    initialFields.forEach((field) => {
        if (! inputsRef.current[field]) {
            inputsRef.current[field] = null; // ✅ simple assignment
        }
    });

    const [errors, setErrors] = useState({});

    const handleValidation = (e) => {
        const {name} = e.target;
        const input = inputsRef.current[name]; // ✅ no `.current`

        if (! input) 
            return;
        

        const inputIsValid = input.checkValidity();

        if (! input.checkValidity()) {
            setErrors((prev) => ({
                ...prev,
                [name]: input.validationMessage
            }));
        } else {
            setErrors((prev) => {
                const newErrors = {
                    ...prev
                };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return {inputsRef, errors, handleValidation};
}
 */

import { useRef, useState } from "react";

export function useValidation(initialFields = []) {
  const inputsRef = useRef({});
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  // Initialize keys
  initialFields.forEach((field) => {
    if (!inputsRef.current[field]) {
      inputsRef.current[field] = null;
    }
  });

  const handleValidation = (e) => {
    const { name } = e.target;
    const input = inputsRef.current[name];

    if (!input) return;

    const inputIsValid = input.checkValidity();

    setErrors((prev) => {
      const updated = { ...prev };
      if (!inputIsValid) {
        updated[name] = input.validationMessage;
      } else {
        delete updated[name];
      }
      return updated;
    });

    // Recalculate entire form validity
    setTimeout(() => {
      const allValid = initialFields.every((field) => {
        const input = inputsRef.current[field];
        return input && input.checkValidity();
      });
      setFormIsValid(allValid);
    }, 0);
  };

  return { inputsRef, errors, handleValidation, formIsValid };
}
