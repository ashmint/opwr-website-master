;(function (root) {
"use strict";

var calculators = root.OpenwireCalculators = root.OpenwireCalculators || {};

// List of hardware and their specifications
const hardware = {
    cpus: [
        // [Name, Cores, Threads, Base Clock, Boost Clock]
        ["Intel Pentium Gold G6400", 2, 4, 4, 4],
        ["Intel Core I3-9350K", 4, 4, 4, 4.6],
        ["AMD Ryzen 5 3500", 6, 6, 3.6, 4.1],
        ["Intel i3 10100", 4, 8, 3.6, 4.3],
        ["Intel Core I3-10105", 4, 8, 3.7, 4.4],
        ["Intel Core I5-12400", 6, 12, 2.5, 4.4],
        ["Intel Core I5-10400", 6, 12, 2.6, 4.4],
        ["Intel Core I5-11500", 6, 12, 2.7, 4.6],
        ["Intel Core I5-10500", 6, 12, 3.1, 4.5],
        ["AMD Ryzen 5 3600", 6, 12, 3.6, 4.2],
        ["Intel Core I7-11700", 8, 16, 2.5, 4.9],
        ["AMD Ryzen 5 5600G", 6, 12, 3.9, 4.4],
        ["Intel Core I5-12600K", 10, 16, 2.8, 4.9],
        ["Intel Core I5-11600K", 6, 12, 3.9, 4.9],
        ["Intel Core I7-12700K", 12, 20, 2.7, 5],
        ["Intel Core I7-11700K", 8, 16, 3.6, 5],
        ["AMD Ryzen 7 5700G", 8, 16, 3.8, 4.6],
        ["Intel Core I7-10700K", 8, 16, 3.8, 5.1],
        ["Intel Core I5-10400F", 6, 12, 2.9, 4.3],
        ["Intel Core I5-11600KF", 6, 12, 3.9, 4.9],
        ["Intel Core I5-11400F", 6, 12, 2.6, 4.4],
        ["Intel Core I5-12400F", 6, 12, 2.5, 4.4],
        ["Intel Core I7-11700KF", 8, 16, 3.6, 5],
        ["Intel Core I7-12700KF", 12, 20, 2.7, 5],
        ["AMD Ryzen 5 3500X", 6, 6, 3.6, 4.1],
        ["AMD Ryzen 5 5600X", 6, 12, 3.7, 4.6],
        ["AMD Ryzen 7 3700X", 8, 16, 3.6, 4.4],
        ["AMD Ryzen 7 5800X", 8, 16, 3.8, 4.7],
        ["AMD Ryzen 9 5900X", 12, 24, 3.7, 4.8],
        ["AMD Ryzen 9 5950X", 16, 32, 3.4, 4.9],
        ["AMD Ryzen™ 9 7950X3D", 16, 32, 5.7, 4.2],
        ["AMD Ryzen™ 9 7950X", 16, 32, 5.7, 4.5],
        ["AMD Ryzen™ 9 7900X3D", 12, 24, 5.6, 4.4],
        ["AMD Ryzen™ 9 7900X", 12, 24, 5.6, 4.7],
        ["AMD Ryzen™ 9 7900", 12, 24, 5.4, 3.7],
        ["AMD Ryzen™ 7 7800X3D", 8, 16, 5, 4.2],
        ["AMD Ryzen™ 7 7700X", 8, 16, 5.4, 4.5],
        ["AMD Ryzen™ 7 7700", 8, 16, 5.3, 3.8],
        ["AMD Ryzen™ 5 7600X", 6, 12, 5.3, 4.7],
        ["AMD Ryzen™ 5 7600", 6, 12, 5.1, 3.8],
        ["AMD Ryzen™ 5 7500F", 6, 12, 5, 3.7],
        ["AMD Ryzen™ 7 8700G", 8, 16, 5.1, 4.2],
        ["AMD Ryzen™ 5 8600G", 6, 12, 5, 4.3],
        ["AMD Ryzen™ 5 8500G", 6, 12, 5, 3.5],
        ["AMD Ryzen™ 3 8300G", 4, 8, 4.9, 3.4],
        ["Core i9-12900KS", 16, 24, 3.4, 5.5],
        ["Core i9-12900K", 16, 24, 3.2, 5.2],
        ["Core i9-12900KF", 16, 24, 3.2, 5.2],
        ["Core i9-12900", 16, 24, 2.4, 5.1],
        ["Core i7-12700K", 12, 20, 3.8, 5],
        ["Core i7-12700KF", 12, 20, 3.8, 5],
        ["Core i7-12700", 12, 20, 3.5, 4.7],
        ["Core i7-12700F", 12, 20, 3.5, 4.7],
        ["Core i5-12600K", 10, 20, 3.7, 4.9],
        ["Core i5-12600KF", 10, 20, 3.7, 4.9],
        ["Core i5-12600", 10, 20, 3.5, 4.6],
        ["Core i5-12600T", 10, 20, 2.7, 4.2],
        ["Core i5-12500", 10, 20, 3, 4.6],
        ["Core i5-12500T", 10, 20, 2.7, 4.2],
        ["Core i3-12300", 8, 8, 3.5, 4.6],
        ["Core i3-12300T", 8, 8, 2.6, 4.3],
        ["Core i3-12100", 8, 8, 3.3, 4.3],
    ],
    memories: [
        // [Configuration, Capacity]
        ["8 GB x 1", 8],
        ["8 GB x 2", 16],
        ["16 GB x 1 + 4 GB x 1", 20],
        ["16 GB x 1 + 8 GB x 1", 24],
        ["16 GB x 2", 32],
        ["16 GB x 2 + 8 GB x 1", 40],
        ["32 GB x 2", 64],
        ["32 GB x 2 + 16 GB x 1", 80],
        ["32 GB x 3", 96],
        ["32 GB x 4", 128],
    ],
    gpus: [
        // [Name, Score]
        ["Nvidia GeForce RTX 3090", 100],
        ["Nvidia GeForce RTX 3080 Ti", 97.9],
        ["AMD Radeon RX 6900 XT", 97],
        ["AMD Radeon RX 6800 XT", 93.5],
        ["Nvidia GeForce RTX 3080", 93.2],
        ["AMD Radeon RX 6800", 85.7],
        ["Nvidia GeForce RTX 3070 Ti", 81.5],
        ["Nvidia Titan RTX", 79.5],
        ["Nvidia GeForce RTX 2080 Ti", 77.4],
        ["Nvidia GeForce RTX 3070", 76.3],
        ["AMD Radeon RX 6700 XT", 73.3],
        ["Nvidia GeForce RTX 3060 Ti", 69.6],
        ["Nvidia Titan V", 68.7],
        ["Nvidia GeForce RTX 2080 Super", 66.8],
        ["Nvidia GeForce RTX 2080", 62.5],
        ["Nvidia Titan Xp", 61.1],
        ["Nvidia GeForce RTX 2070 Super", 59.6],
        ["AMD Radeon VII", 58.9],
        ["Nvidia GeForce GTX 1080 Ti", 57.8],
        ["AMD Radeon RX 6600 XT", 57.7],
        ["AMD Radeon RX 5700 XT", 57],
        ["Nvidia GeForce RTX 3060 12GB", 54.7],
        ["Nvidia GeForce RTX 2070", 53.1],
        ["AMD Radeon RX 5700", 51.4],
        ["Nvidia GeForce RTX 2060 Super", 50.6],
        ["AMD Radeon RX 6600", 49.2],
        ["AMD Radeon RX Vega 64", 48.4],
        ["AMD Radeon RX 5600 XT", 46.6],
        ["Nvidia GeForce GTX 1080", 45.2],
        ["Nvidia GeForce RTX 2060", 44.9],
        ["AMD Radeon RX Vega 56", 42.7],
        ["Nvidia GeForce GTX 1070 Ti", 41.8],
        ["Nvidia GeForce GTX 1660 Super", 37.9],
        ["Nvidia GeForce GTX 1660 Ti", 37.8],
        ["Nvidia GeForce GTX 1070", 36.7],
        ["Nvidia GTX Titan X (Maxwell)", 35.3],
        ["Nvidia GeForce GTX 980 Ti", 32.9],
        ["Nvidia GeForce GTX 1660", 32.8],
        ["AMD Radeon R9 Fury X", 32.7],
        ["AMD Radeon RX 590", 32.4],
        ["AMD Radeon RX 5500 XT 8GB", 31.8],
        ["AMD Radeon RX 580 8GB", 30.9],
        ["Nvidia GeForce GTX 1650 Super", 28.5],
        ["AMD Radeon RX 5500 XT 4GB", 28.4],
        ["AMD Radeon R9 390", 27.2],
        ["Nvidia GeForce GTX 1060 6GB", 26.5],
        ["Nvidia GeForce GTX 980", 26.4],
        ["AMD Radeon RX 570 4GB", 25.2],
        ["Nvidia GTX 1650 GDDR6", 23.8],
        ["Nvidia GeForce GTX 1060 3GB", 22.3],
        ["Nvidia GeForce GTX 970", 22.1],
        ["Nvidia GeForce GTX 1650", 20.9],
        ["Nvidia GeForce GTX 1050 Ti", 16.1],
        ["AMD Radeon RX 560 4GB", 12.5],
        ["Nvidia GeForce GTX 1050", 12.2],
        ["AMD Radeon RX 550", 8],
        ["Nvidia GeForce GT 1030", 6.7],
    ]
}

// Performance Levels
const performanceLevels = [
    // Low
    {
        // [Tier 1, Tier 2, Tier 3]
        cpu: [2, 4, 8],
        memory: [0.8, 1.2, 2.8],
        gpu: [0, 0.6, 2.65]
    },
    // Medium
    {
        cpu: [3, 5, 10],
        memory: [1, 2, 3.8],
        gpu: [0, 0.8, 4.4]
    },
    // High
    {
        cpu: [4, 6, 12],
        memory: [1.2, 2.8, 4.8],
        gpu: [0, 1, 8.83]
    }
]

// Split users into groups
function splitUsers(users) {
    const oneForth = users / 4
    return [
        Math.ceil(oneForth),
        Math.ceil(oneForth),
        Math.floor(oneForth),
        Math.floor(oneForth)
    ]
}

// Calculate minimum CPU Scores
function calculateCpu(users, tier, performanceLevel) {
    const cpu = performanceLevels[performanceLevel].cpu[tier - 1]
    const userSplit = splitUsers(users)
    return (userSplit[0] * cpu) + (userSplit[1] * cpu * 0.75) + (userSplit[2] * cpu * 0.5) + (userSplit[3] * cpu * 0.25)
}

// Calculate minimum memory
function calculateMemory(users, tier, performance_level) {
    const memory = performanceLevels[performance_level].memory[tier - 1]
    return Math.ceil(users * memory)
}

// Calculate minimum GPU
function calculateGpu(users, tier, performance_level) {
    const gpu = performanceLevels[performance_level].gpu[tier - 1]
    return Math.ceil(users * gpu)
}

// Find CPU for score
function findCpuForScore(score) {
    let filteredCPUs = []
    hardware.cpus.forEach(cpu => {
        // score = (threads/cores) * (baseclock*(cores-1)+turboclock)
        let cpuScore = Math.round((cpu[2] / cpu[1]) * (cpu[3] * (cpu[1] - 1) + cpu[4]))
        if (cpuScore > score) {
            filteredCPUs.push({
                name: cpu[0],
                score: cpuScore
            })
        }
    })
    filteredCPUs.sort((a, b) => a.score - b.score)
    return filteredCPUs.slice(0, 3)
}

// Find memory for size
function findMemoryForSize(size) {
    for (let i = 0; i < hardware.memories.length; i++) {
        if (hardware.memories[i][1] >= size) {
            return {
                name: hardware.memories[i][0],
                size: hardware.memories[i][1]
            }
        }
    }
    return
}

// Find GPU for score
function findGpuForScore(score) {
    if (score === 0) {
        return []
    }
    let filteredGPUs = []
    hardware.gpus.forEach(gpu => {
        let gpuScore = gpu[1]
        if (gpuScore > score) {
            filteredGPUs.push({
                name: gpu[0],
                score: gpuScore
            })
        }
    })
    filteredGPUs.sort((a, b) => a.score - b.score)
    return filteredGPUs.slice(0, 3)
}

// Calculate total
function calculateTotal(users, performance_level) {
    let cpu = 0, memory = 4, gpu = 0
    let totalUsers = 0
    for (let i = 0; i < users.length; i++) {
        totalUsers += users[i]
        cpu += calculateCpu(users[i], i + 1, performance_level)
        memory += calculateMemory(users[i], i + 1, performance_level)
        gpu += calculateGpu(users[i], i + 1, performance_level)
    }
    if (totalUsers > 0) {
        return {
            cpu,
            memory,
            gpu,
            totalUsers
        }
    }
    return
}

// Find resource for users
function findResourceForUsers(users, performance_level) {
    let total = calculateTotal(users, performance_level)
    if (total && total.totalUsers > 0) {
        return {
            cpu: findCpuForScore(total.cpu),
            memory: findMemoryForSize(total.memory),
            gpu: findGpuForScore(total.gpu),
            minimum: {
                cpu: total.cpu,
                memory: total.memory,
                gpu: total.gpu
            },
            totalUsers: total.totalUsers
        }
    }
    return
}

// Calculate
function calculate() {
    if (!document.getElementById("server-calculator")) {
        return
    }
    let users = [parseInt($("#tier1").val()), parseInt($("#tier2").val()), parseInt($("#tier3").val())]
    let performance_level = $("#performanceLevel").val()
    let resource = findResourceForUsers(users, performance_level)
    if (resource) {
        // CPU
        let cpus = ""
        if (resource.cpu.length == 0) {
            cpus += `<p>No CPU available. Try reducing the number of users.</p>`
        } else {
            for (let i = 0; i < resource.cpu.length; i++) {
                cpus += `<p>${resource.cpu[i].name} - ${resource.cpu[i].score}</p>`
            }
        }
        cpus += `<small>Minimum score: ${resource.minimum.cpu}</small>`

        // Memory
        let memories = `<p>${resource.memory.name} - ${resource.memory.size} GB</p>`
        memories += `<small>Minimum capacity: ${resource.minimum.memory} GB</small>`

        // GPU
        let gpus = ""
        if (resource.minimum.gpu === 0) {
            gpus += `<p>Not required</p>`
        } else {
            if (resource.gpu.length == 0) {
                gpus += `<p>No GPU available. Try reducing the number of users.</p>`
            } else {
                for (let i = 0; i < resource.gpu.length; i++) {
                    gpus += `<p>${resource.gpu[i].name} - ${resource.gpu[i].score}</p>`
                }
            }
            gpus += `<small>Minimum score: ${resource.minimum.gpu}</small>`
        }

        $("#cpu").html(cpus)
        $("#memory").html(memories)
        $("#gpu").html(gpus)
        $("#results").removeClass("d-none")
        $("#placeholder").addClass("d-none")
        window.history.replaceState("", "", `?tier1=${users[0]}&tier2=${users[1]}&tier3=${users[2]}&performanceLevel=${performance_level}#calculator`)
    } else {
        $("#results").addClass("d-none")
        $("#placeholder").removeClass("d-none")
    }
}

function init() {
    var form = document.getElementById("server-calculator")
    if (!form || form.dataset.serverCalculatorInit === "true") {
        return
    }

    form.dataset.serverCalculatorInit = "true"
    form.addEventListener("submit", function (event) {
        event.preventDefault()
        calculate()
    })

    // Parse values from url
    let urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("tier1")) {
        $("#tier1").val(urlParams.get("tier1"))
    }
    if (urlParams.has("tier2")) {
        $("#tier2").val(urlParams.get("tier2"))
    }
    if (urlParams.has("tier3")) {
        $("#tier3").val(urlParams.get("tier3"))
    }
    if (urlParams.has("performanceLevel")) {
        $("#performanceLevel").val(urlParams.get("performanceLevel"))
    }
    calculate()
}

calculators.server = {
    init: init,
    calculate: calculate
}

$(function () {
    calculators.server.init()
})
})(window)
