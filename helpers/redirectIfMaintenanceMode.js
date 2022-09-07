import Router from 'next/router'

export default function redirectIfMaintenanceMode() {
  fetch('/api/maintenance')
    .then((res) => res.json())
    .then((data) => {
      if (data.maintenanceModeEnabled) {
        Router.push('/service-unavailable')
      }
    })
}