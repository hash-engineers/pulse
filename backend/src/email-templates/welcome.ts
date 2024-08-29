type WelcomeMail = { username: string };

const welcomeMail = ({ username }: WelcomeMail): string => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Pulse</title>
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
                <h1 style="color: #ffffff; margin: 0">Welcome to Pulse</h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding: 40px 20px">
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
                  Thank you for joining Pulse! We're thrilled to have you with
                  us. Our mission is to ensure your websites are always up and
                  running smoothly, so you never miss a beat.
                </p>
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0 0 20px;
                    text-align: left;
                  "
                >
                  As a new member, you'll receive instant alerts and detailed
                  reports to help you stay informed about your website's status.
                  Whether you're managing a personal blog or a large enterprise,
                  we've got you covered.
                </p>
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0;
                    text-align: left;
                    font-weight: bold;
                  "
                >
                  To help you get started, here are some tips:
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
                  <li>Start by adding your first website to monitor.</li>
                  <li>
                    Set up your preferred alert methods (email, SMS, push
                    notifications) or call.
                  </li>
                  <li>
                    Explore the dashboard to view uptime statistics and incident
                    reports.
                  </li>
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
                  We're here to support you every step of the way. If you have
                  any questions or need assistance, feel free to reach out to
                  our support team.
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
                  Need help? Contact our support team at
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

export default welcomeMail;
