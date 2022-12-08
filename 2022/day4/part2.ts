const input = await Deno.readTextFile("input.txt");

const overlappingAssignments =
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
    // Check if a pair overlaps the other pair
    .map(
        (pairs) => {
            const [pair1, pair2] = pairs;
            let overlapping = false;
            for (let i = pair1[0]; i <= pair1[1]; i++) {
                if (i >= pair2[0] && i <= pair2[1]) {
                    overlapping = true;
                    break;
                }
            }
            return overlapping;
        }
    )
    // Count the number of true values
    .reduce((count, val) => val ? count + 1 : count, 0);

console.log(overlappingAssignments);