;(function (root) {
"use strict";

var calculators = root.OpenwireCalculators = root.OpenwireCalculators || {};

const raids = {
    "JBOD": {
        isValid: (drives) => {
            if (drives.length < 2) {
                return {
                    valid: false,
                    message: "JBOD requires at least 2 drives."
                }
            }
            return { valid: true }
        },
        formula: (drives) => {
            var sum = 0;
            for (const drive of drives) {
                sum += drive
            }
            return {
                capacity: sum,
                protection: 0,
                unused: 0
            }
        }
    },
    "RAID 0": {
        isValid: (drives) => {
            if (drives.length < 2) {
                return {
                    valid: false,
                    message: "RAID 0 requires at least 2 drives."
                }
            }
            return { valid: true }
        },
        formula: (drives) => {
            var sum = 0;
            for (const drive of drives) {
                sum += drive
            }
            return {
                capacity: sum,
                protection: 0,
                unused: 0
            }
        }
    },
    "RAID 1": {
        isValid: (drives) => {
            if (drives.length < 2) {
                return {
                    valid: false,
                    message: "RAID 1 requires at least 2 drives."
                }
            }
            return { valid: true }
        },
        formula: (drives) => {
            var drivesSorted = drives.map(x => x).sort((a, b) => a - b);
            var unused = 0;
            for (const drive of drivesSorted) {
                unused += drive - drivesSorted[0]
            }
            return {
                capacity: drivesSorted[0],
                protection: drivesSorted[0] * (drivesSorted.length - 1),
                unused: unused
            }
        }
    },
    "RAID 5": {
        isValid: (drives) => {
            if (drives.length < 3) {
                return {
                    valid: false,
                    message: "RAID 5 requires at least 3 drives."
                }
            }
            return { valid: true }
        },
        formula: (drives) => {
            var drivesSorted = drives.map(x => x).sort((a, b) => a - b);
            var unused = 0;
            for (const drive of drivesSorted) {
                unused += drive - drivesSorted[0]
            }
            return {
                capacity: (drivesSorted.length - 1) * drivesSorted[0],
                protection: drivesSorted[0],
                unused: unused
            }
        }
    },
    "RAID 6": {
        isValid: (drives) => {
            if (drives.length < 4) {
                return {
                    valid: false,
                    message: "RAID 6 requires at least 4 drives."
                }
            }
            return { valid: true }
        },
        formula: (drives) => {
            var drivesSorted = drives.map(x => x).sort((a, b) => a - b);
            var unused = 0;
            for (const drive of drivesSorted) {
                unused += drive - drivesSorted[0]
            }
            return {
                capacity: (drivesSorted.length - 2) * drivesSorted[0],
                protection: drivesSorted[0] * 2,
                unused: unused
            }
        }
    },
    "RAID 10": {
        isValid: (drives) => {
            if (drives.length < 4) {
                return {
                    valid: false,
                    message: "RAID 10 requires at least 4 drives."
                }
            }
            return { valid: true }
        },
        formula: (drives) => {
            var drivesSorted = drives.map(x => x).sort((a, b) => a - b);
            var sum = 0;
            for (const drive of drivesSorted) {
                sum += drive
            }
            const unused = sum - ((Math.floor(drivesSorted.length / 2) * 2) * drivesSorted[0])
            return {
                capacity: Math.floor(drivesSorted.length / 2) * drivesSorted[0],
                protection: drivesSorted[0] * Math.floor(drivesSorted.length / 2),
                unused: unused
            }
        }
    }
}

function formatSize(size) {
    if (size >= 1000) {
        return (size / 1000) + " TB"
    }
    return size + " GB"
}

function calculate(raid, drives) {
    // Reset error message
    $("#result-error").text("")

    // Validate
    const isValid = raids[raid].isValid(drives)
    if (!isValid.valid) {
        $("#result-error").text(isValid.message)
        $("#result").addClass("d-none")
        return
    }

    // Calculate
    const result = raids[raid].formula(drives)

    // Display
    $("#result").removeClass("d-none")
    $("#result-capacity").text(formatSize(result.capacity))
    $("#result-protection").text(formatSize(result.protection))
    $("#result-unused").text(formatSize(result.unused))
}

// Parse capacity in GB
function parseCapacity(capacity) {
    const vals = capacity.split(" ")
    if (vals[1] == "TB") {
        return parseFloat(vals[0]) * 1000
    }
    return parseInt(capacity)
}

// Store raid type
var raid = "JBOD"

// Store drive layout
var driveLayout = []

function init() {
    var raidContainer = document.getElementById("raid")
    if (!raidContainer || raidContainer.dataset.raidCalculatorInit === "true") {
        return
    }

    raidContainer.dataset.raidCalculatorInit = "true"
    raid = "JBOD"
    driveLayout = []
    $("#layout").empty()
    $("#result").addClass("d-none")
    $("#result-error").text("")

    // Handle change to raid
    $("#raid .choice-block").on("click", function () {
        $("#raid .choice-block").removeClass("active")
        $(this).addClass("active")

        // Store raid
        raid = $(this).data("value")

        // Calculate
        calculate(raid, driveLayout)
    })

    // Handle change to disks
    $("#disks .choice-block").on("click", function () {
        driveLayout.push(parseCapacity($(this).data("value")))

        $("#layout").append(`<div class="choice-block col-12 my-2 px-0"><p class="p-2">${$(this).data("value")}</p></div>`)

        // Calculate
        calculate(raid, driveLayout)
    })

    // Handle remove disk
    $("#layout").on("click", ".choice-block", function () {
        const index = $(this).index()
        driveLayout.splice(index, 1)
        console.log(index, driveLayout)

        $(this).remove()

        // Calculate
        calculate(raid, driveLayout)
    })

    // Set initial raid
    $("#raid .choice-block").eq(0).click()
}

calculators.raid = {
    init: init,
    calculate: calculate
}

$(function () {
    calculators.raid.init()
})
})(window)
