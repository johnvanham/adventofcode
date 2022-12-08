const input = await Deno.readTextFile("input.txt");

const containedAssignments =
    // Split input into lines
    input.split("\n")
    // Split lines by comma
    .map((line) => line.split(","))
    // Split pairs and convert to number
    .map(
        (pairs) => pairs.map(
            (pair) => pair.split("-").map(
                (assignment) => Number(assignment)
            )
        )
    )
    // Check if a pair contains the other pair
    .map(
        (pairs) => {
            const [pair1, pair2] = pairs;
            // If pair1 contains pair2
            if (pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) {
                return true;
            }
            // If pair2 contains pair1
            if (pair2[0] <= pair1[0] && pair2[1] >= pair1[1]) {
                return true;
            }
            return false;
        }
    )
    // Count the number of true values
    .reduce((count, val) => val ? count + 1 : count, 0);

console.log(containedAssignments);