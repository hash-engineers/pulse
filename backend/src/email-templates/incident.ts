type IncidentMail = {
  username: string;
  monitorName?: string;
  monitorUrl: string;
  incidentType: string;
  incidentDetectedAt: string;
  navigateUrl: string;
};

const incidentMail = ({
  username,
  monitorName,
  monitorUrl,
  incidentType,
  incidentDetectedAt,
  navigateUrl,
}: IncidentMail): string => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Incident Alert from Pulse</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Moderustic:wght@300..800&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=SUSE:wght@100..800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      font-family: Poppins, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom, #f4f4f4, #ffffff);
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="padding: 20px 0"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="background-color: #6a0dad; padding: 20px"
              >
                <h1 style="color: white; margin: 0">
                  Your Website is Experiencing an Incident
                </h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding: 40px 20px;
                  background: linear-gradient(to right, #ffebee, #e0e0ff);
                "
              >
                <h2 style="color: #333333; margin: 0 0 20px; text-align: left">
                  Hello ${username},
                </h2>
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0 0 20px;
                    text-align: left;
                  "
                >
                  We wanted to inform you that an incident has been detected on
                  one of your monitored websites:
                </p>
                ${
                  monitorName &&
                  `<p
                  style="
                    color: #333333;
                    font-size: 16px;
                    line-height: 14px;
                    margin: 0 0 20px;
                    font-weight: bold;
                    text-align: left;
                  "
                >
                  Monitor name: ${monitorName}
                </p>`
                }
                <p
                  style="
                    color: #333333;
                    font-size: 16px;
                    line-height: 14px;
                    margin: 0 0 20px;
                    font-weight: bold;
                    text-align: left;
                  "
                >
                  Monitor url: ${monitorUrl}
                </p>
                <p
                  style="
                    color: #333333;
                    font-size: 16px;
                    line-height: 14px;
                    margin: 0 0 20px;
                    font-weight: bold;
                    text-align: left;
                  "
                >
                  Incident type: ${incidentType}
                </p>
                <p
                  style="
                    color: #333333;
                    font-size: 16px;
                    line-height: 14px;
                    margin: 0 0 20px;
                    font-weight: bold;
                    text-align: left;
                  "
                >
                  Incident detected at: ${incidentDetectedAt}
                </p>
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0 0 30px;
                    text-align: left;
                  "
                >
                  We are actively monitoring the situation and will notify you
                  as soon as the issue is resolved. In the meantime, you can
                  review the incident details in your dashboard.
                </p>
                <p
                  style="
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0 0 20px;
                    font-weight: bold;
                    text-align: left;
                  "
                >
                  What can you do?
                </p>
                <ul
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    text-align: left;
                    padding-left: 20px;
                  "
                >
                  <li>
                    Investigate the issue on your end, such as checking server
                    logs or recent changes.
                  </li>
                  <li>Keep your team informed about the incident.</li>
                  <li>Stay tuned for further updates from Pulse.</li>
                </ul>
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 20px 0;
                    text-align: left;
                  "
                >
                  We're here to assist you if you have any questions or need
                  support during this incident.
                </p>
                <!-- Button -->
                <p style="text-align: center; margin: 30px 0">
                  <a
                    href="${navigateUrl}"
                    style="
                      display: inline-block;
                      padding: 12px 25px;
                      background-color: #6a0dad;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                      font-size: 16px;
                    "
                    >Take a look at this</a
                  >
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td align="center" style="padding: 0 20px">
                <hr
                  style="border: none; border-top: 1px solid #dddddd; margin: 0"
                />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding: 20px;
                  background-color: #f4f4f4;
                  color: #888888;
                  font-size: 14px;
                "
              >
                <p style="margin: 0 0 10px">
                  For immediate assistance, contact our support team at
                  <a
                    href="mailto:support@pulse.com"
                    style="color: #6a0dad; text-decoration: none"
                    >support@pulse.com</a
                  >
                </p>
                <p style="margin: 0">&copy; 2024 Pulse. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  
`;
};

export default incidentMail;
