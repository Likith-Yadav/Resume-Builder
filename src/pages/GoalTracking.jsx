import React, { useState } from 'react';
import { 
    FaBullseye, 
    FaPlus, 
    FaCheck, 
    FaTrash,
    FaClipboardList 
} from 'react-icons/fa';

export default function GoalTracking() {
    const [goals, setGoals] = useState([
        { 
            id: 1, 
            title: 'Learn Advanced React', 
            description: 'Complete advanced React course on Udemy',
            completed: false 
        },
        { 
            id: 2, 
            title: 'Build Portfolio Project', 
            description: 'Create a full-stack web application',
            completed: false 
        }
    ]);

    const [newGoal, setNewGoal] = useState({ title: '', description: '' });

    const addGoal = () => {
        if (newGoal.title.trim() && newGoal.description.trim()) {
            setGoals([...goals, {
                id: Date.now(),
                title: newGoal.title,
                description: newGoal.description,
                completed: false
            }]);
            setNewGoal({ title: '', description: '' });
        }
    };

    const toggleGoalCompletion = (id) => {
        setGoals(goals.map(goal => 
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute top-0 right-0 w-[500px] h-[500px] 
                    bg-gradient-to-bl from-red-400/10 via-orange-500/10 to-yellow-600/10 
                    rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                        <FaBullseye className="mr-4 text-red-600" />
                        Goal Tracking
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">Turn your career aspirations into achievements</p>
                </div>

                {/* Goal Input */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-10">
                    <div className="flex space-x-4 mb-6">
                        <input 
                            type="text" 
                            placeholder="Goal Title" 
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                            className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button 
                            onClick={addGoal}
                            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Goal
                        </button>
                    </div>
                    <textarea 
                        placeholder="Goal Description" 
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="3"
                    />
                </div>

                {/* Goals List */}
                <div className="space-y-6">
                    {goals.map((goal) => (
                        <div 
                            key={goal.id} 
                            className={`
                                bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 
                                transform transition-all duration-300 hover:scale-[1.02]
                                ${goal.completed ? 'opacity-60' : ''}
                            `}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className={`text-xl font-bold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                        {goal.title}
                                    </h3>
                                    <p className={`text-gray-600 ${goal.completed ? 'line-through' : ''}`}>
                                        {goal.description}
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => toggleGoalCompletion(goal.id)}
                                        className={`
                                            p-2 rounded-full 
                                            ${goal.completed 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                                            }
                                        `}
                                    >
                                        <FaCheck />
                                    </button>
                                    <button 
                                        onClick={() => deleteGoal(goal.id)}
                                        className="p-2 bg-red-200 text-red-600 rounded-full hover:bg-red-300"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
