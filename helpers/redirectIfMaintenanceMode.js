import Router from 'next/router'

export default function redirectIfMaintenanceMode() {
  fetch('/api/maintenance')
    .then((res) => {
      if (res.status === 500) {
        console.error('Error fetching maintenance mode status {Status}', res.status);
        return;
      }
      return res.json();
    })
    .then((data) => {
      if (data === null) return;

      if (data.maintenanceModeEnabled) {
        Router.push('/service-unavailable')
      }
    })
}
