'use client'

import { useState } from 'react';
import BNavbar from '../navbar';

const RulesPage = () => {
    const [rules, setRules] = useState<string[]>([
        'Middle names only',
        'friends ALWAYS go south',
        'Thou shalt not kill'
    ]);
    const [newRule, setNewRule] = useState('');

    const addRule = () => {
        if (newRule.trim()) {
            setRules([...rules, newRule.trim()]);
            setNewRule('');
        }
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const updateRule = (index: number, updatedRule: string) => {
        const updatedRules = rules.map((rule, i) => (i === index ? updatedRule : rule));
        setRules(updatedRules);
    };

    return (
        <div>
            <BNavbar></BNavbar>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
                <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">Branson Rules</h1>
                <ul className="bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
                    {rules.map((rule, index) => (
                        <li key={index} className="mb-4 flex items-center justify-between">
                            <input
                                type="text"
                                value={rule}
                                onChange={(e) => updateRule(index, e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full mr-4"
                            />
                            <button
                                onClick={() => removeRule(index)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                    <li className="mt-4 flex items-center">
                        <input
                            type="text"
                            value={newRule}
                            onChange={(e) => setNewRule(e.target.value)}
                            placeholder="New rule"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mr-4"
                        />
                        <button
                            onClick={addRule}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Add Rule
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RulesPage;
