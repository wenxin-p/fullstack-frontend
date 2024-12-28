import React from "react";

function ClassFilter({
  categories,
  classTiers,
  instructors,
  selectedCategory,
  setSelectedCategory,
  selectedClassTier,
  setSelectedClassTier,
  selectedInstructor,
  setSelectedInstructor,
}) {
  return (
    <div className="dropdowntab">
      <label>
        Category:
        <select
          className="dropdown-button"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Class Tier:
        <select
          className="dropdown-button"
          value={selectedClassTier}
          onChange={(e) => setSelectedClassTier(e.target.value)}
        >
          <option value="">All Tiers</option>
          {classTiers.map((tier, index) => (
            <option key={index} value={tier}>
              {tier}
            </option>
          ))}
        </select>
      </label>
      <label>
        Instructor:
        <select
          className="dropdown-button"
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
        >
          <option value="">All Instructors</option>
          {instructors.map((instructor, index) => (
            <option key={index} value={instructor}>
              {instructor}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ClassFilter;
