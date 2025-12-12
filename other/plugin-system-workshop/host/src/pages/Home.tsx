import React, { useState } from "react";
import { useHooks } from "../pluginManager";

export const BMICalculator: React.FC = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBMI] = useState<number | null>(null);
    const [category, setCategory] = useState("");

    const { callHook, hasHook } = useHooks()

    const on_bmi_calculated = (value: string) => {

        if (hasHook('on_bmi_calculated')) {
            console.log("New hook registered: on_bmi_calculated")
            value = callHook('on_bmi_calculated', value) as any
        } else {
            console.log("No custom hook for on_bmi_calculated")
        }

        setCategory(value)
    }

    const calculateBMI = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);
        if (!h || !w) return;

        const bmiValue = w / ((h / 100) ** 2);
        setBMI(parseFloat(bmiValue.toFixed(2)));

        let cat = "";
        if (bmiValue < 18.5) cat = "Underweight";
        else if (bmiValue < 25) cat = "Normal";
        else if (bmiValue < 30) cat = "Overweight";
        else cat = "Obese";
        on_bmi_calculated(cat);
    };

    return (
        <div style={{ maxWidth: 400, margin: "20px auto", fontFamily: "sans-serif" }}>
            <h1>BMI Calculator</h1>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Height (cm):{" "}
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </label>
            </div>

            <div style={{ marginBottom: 10 }}>
                <label>
                    Weight (kg):{" "}
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={calculateBMI} style={{ padding: "5px 10px", cursor: "pointer" }}>
                Calculate
            </button>

            {bmi !== null && (
                <div style={{ marginTop: 20 }}>
                    <p>BMI: {bmi}</p>
                    <div>Category:
                        {category}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator