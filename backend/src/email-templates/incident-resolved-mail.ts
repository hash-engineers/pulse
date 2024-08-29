import env from '../env';

type IncidentResolvedMail = {
  username: string;
  monitorName: string;
  incidentType: string;
  resolvedAt: string;
  acknowledgedBy: string;
  acknowledgedAt: string;
};

const incidentResolvedMail = ({
  username,
  monitorName,
  incidentType,
  resolvedAt,
  acknowledgedBy,
  acknowledgedAt,
}: IncidentResolvedMail): string => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Incident Resolved - Pulse</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Moderustic:wght@300..800&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=SUSE:wght@100..800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      font-family: Poppins, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #f4f4f4; padding: 20px 0"
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
                <h1 style="color: #ffffff; margin: 0">An Incident Resolved</h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding: 40px 20px;
                  background: linear-gradient(
                    to bottom right,
                    #c5fbfc5c,
                    #c9ffd884,
                    #f0c3ff94
                  );
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
                  We are pleased to inform you that the incident affecting your
                  monitored website has been resolved. Below are the details:
                </p>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="margin: 20px 0; font-size: 16px"
                >
                  <tr>
                    <td
                      style="color: #333333; font-weight: bold; padding: 8px 0"
                    >
                      Monitor name:
                    </td>
                    <td style="color: #666666; padding: 8px 0">
                      ${monitorName}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="color: #333333; font-weight: bold; padding: 8px 0"
                    >
                      Incident type:
                    </td>
                    <td style="color: #666666; padding: 8px 0">
                      ${incidentType}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="color: #333333; font-weight: bold; padding: 8px 0"
                    >
                      Acknowledged by:
                    </td>
                    <td style="color: #666666; padding: 8px 0">
                      ${acknowledgedBy}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="color: #333333; font-weight: bold; padding: 8px 0"
                    >
                      Acknowledged at:
                    </td>
                    <td style="color: #666666; padding: 8px 0">
                      ${acknowledgedAt}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="color: #333333; font-weight: bold; padding: 8px 0"
                    >
                      Resolved at:
                    </td>
                    <td style="color: #666666; padding: 8px 0">
                      ${resolvedAt}
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 20px 0;
                    text-align: left;
                  "
                >
                  We appreciate your patience during this time. If you have any
                  further concerns or need assistance, please do not hesitate to
                  reach out to our support team.
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
                  For further support, contact us at
                  <a
                    href="mailto:${env.USER_EMAIL}"
                    style="color: #6a0dad; text-decoration: none"
                    >${env.USER_EMAIL}</a
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

export default incidentResolvedMail;
