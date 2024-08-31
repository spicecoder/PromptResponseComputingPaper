function nameNorm(stringName) {
    return stringName
        .trim() // Remove leading and trailing spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/[^a-zA-Z0-9 ]/g, ''); // Remove non-alphanumeric characters
}
function syncTest(gateMan, visitor) {

    for (let key in gateMan) {
        let normalizedKeyA = nameNorm(key);
        let found = false;
        
        for (let keyB in visitor) {
            let normalizedKeyB = nameNorm(keyB);
            
            if (normalizedKeyA === normalizedKeyB) {
                found = true;
                // Get trivalence values, defaulting to "True" if not present
                let trivalenceA = gateMan[key][1] || "True";
                let trivalenceB = visitor[keyB][1] || "True";
                
                if (trivalenceA !== trivalenceB) {
                    return false; // Mismatch in trivalence portion
                }
            }
        }
        
        if (!found) {
            return false; // Corresponding PnR not found in visitor
        }
    }
    
    return true; // All PnRs matched successfully
}

// Example usage:

const gateMan= {
    "Question 1": ["Answer 1", "True"],
    "Question 2": ["Answer 2"], // No trivalence, assume "True"
    "Question 3": ["Answer 3", "Undecided"]
};

const visitor = {
    "Question 1": ["Answer 1", "True"],
    "Question 2": ["Answer 2", "True"], // Explicitly "True"
    "Question 3": ["Answer 3", "Undecided"],
    "Question x": ["Answer x", "True"]
};

console.log(syncTest(gateMan, visitor)); // Output: true

const setCPnR = {
    "Question 1": ["Answer 1", "True"],
    "Question 2": ["Answer 2", "False"], // Different trivalence
    "Question 3": ["Answer 3", "Undecided"]
};

console.log(syncTest(gateMan, setCPnR)); // Output: false
