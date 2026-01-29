export const chartData = [
  {
    id: 1,
    title: "Storage",
    description: "Total Storage Usage",
    chartData: {
      labels: ['Used Storage', 'Free Storage'],
      datasets: [{
        label: 'Storage Usage (GB)',
        data: [12, 38],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }]
    }
  },
  {
    id: 2,
    title: "Files",
    description: "Total Files",
    chartData: {
      labels: ['Uploaded Files', 'Free Space'],
      datasets: [{
        label: 'Storage Usage (GB)',
        data: [12, 38],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
      ]
    }
  }
];