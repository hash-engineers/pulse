// import cron from 'node-cron';
// import { asyncForEach } from '../../shared/asyncForEach';
// import { sendEmail } from '../../shared/sendEmail';
// import { Notification } from '../modules/notification/model';
// import { TSubscription } from '../modules/subscription/type';
// import { Subscription } from './../modules/subscription/model';

// cron.schedule('0 10 * * *', async () => {
//   const subscriptions = await Subscription.find({
//     endTime: { $lte: Date.now() },
//   }).populate('userId');

//   await asyncForEach(
//     subscriptions,
//     async (subscription: TSubscription & { _id: string }) => {
//       await Subscription.findByIdAndUpdate(subscription._id, {
//         isActive: false,
//       });

//       await sendEmail(
//         subscription.userId.email,
//         'Subscription Expired',
//         `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Subscription Time Expired</title>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   background-color: #050315;
//                   margin: 0;
//                   padding: 0;
//                   line-height: 1.6;
//               }
//               .container {
//                   max-width: 600px;
//                   margin: 20px auto;
//                   background-color: #fff;
//                   border-radius: 10px;
//                   border-color: 1px #000000;
//                   overflow: hidden;
//               }
//               .header {
//                   background-color: #007bff;
//                   color: #fff;
//                   padding: 20px;
//                   text-align: center;
//               }
//               .content {
//                   padding: 30px;
//                 min-height: 150px;
//               }

//               h1 {
//                   color: #fff;
//                 font-size: 25px;
//                   margin-top: 0;
//               }

//               p {
//                   color: #000000;
//               }

//               .link-style{
//                   display: inline-block;
//                   background-color: #dedcff;
//                   font-size: 13px;
//                   text-decoration: none;
//                   padding: 2px 6px;
//                   border-radius: 5px;
//                   transition: background-color 0.3s;
//               }
//               .link-style:hover {
//                   background-color: #0056b3;
//               }
//               .footer {
//                   background-color: #eaeaea;
//                   color: #fff;
//                   text-align: center;
//                   font-size: 12px;
//                   padding: 20px;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container">
//               <div class="header">
//                   <h1>Subscription Expiration Time</h1>
//               </div>
//               <div class="content">
//                   <p>Hi,</p>
//                   <p>Your subscription time expired. Please renew your plan. <a class="link-style" href=${'https://ecommerce-cms.vercel.app/subscription'}>Renew now</a></p>
//               </div>
//               <div class="footer">
//                   <p>&copy; 2024 E-commerce CMS. All rights reserved.</p>
//               </div>
//           </div>
//       </body>
//       </html>

//       `,
//       );
//     },
//   );
// });

// cron.schedule('0 10 * * *', async () => {
//   const today = new Date();

//   const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   const subscriptions = await Subscription.find({
//     isActive: true,
//     endTime: { $gte: today, $lte: sevenDaysFromNow },
//   }).populate('userId');

//   await asyncForEach(subscriptions, async (subscription: TSubscription) => {
//     const currentDate = new Date();

//     const dateDifference =
//       subscription.endTime.getTime() - currentDate.getTime();

//     const daysRemaining = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));

//     await sendEmail(
//       subscription.userId.email,
//       'Renew Your Subscription.',
//       `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Renew Subscription</title>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   background-color: #050315;
//                   margin: 0;
//                   padding: 0;
//                   line-height: 1.6;
//               }
//               .container {
//                   max-width: 600px;
//                   margin: 20px auto;
//                   background-color: #fff;
//                   border-radius: 10px;
//                   border-color: 1px #000000;
//                   overflow: hidden;
//               }
//               .header {
//                   background-color: #007bff;
//                   color: #fff;
//                   padding: 20px;
//                   text-align: center;
//               }
//               .content {
//                   padding: 30px;
//                 min-height: 150px;
//               }

//               h1 {
//                   color: #fff;
//                 font-size: 25px;
//                   margin-top: 0;
//               }

//               p {
//                   color: #000000;
//               }

//               .link-style{
//                   display: inline-block;
//                   background-color: #dedcff;
//                   font-size: 13px;
//                   text-decoration: none;
//                   padding: 2px 6px;
//                   border-radius: 5px;
//                   transition: background-color 0.3s;
//               }
//               .link-style:hover {
//                   background-color: #0056b3;
//               }
//               .footer {
//                   background-color: #eaeaea;
//                   color: #fff;
//                   text-align: center;
//                   font-size: 12px;
//                   padding: 20px;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container">
//               <div class="header">
//                   <h1>Subscription Expiration</h1>
//               </div>
//               <div class="content">
//                   <p>Hi,</p>
//                   <p>Your subscription will expired soon. ${daysRemaining} ${daysRemaining > 1 ? 'days' : 'day'} remaining. Please renew your plan. <a class="link-style" href=${'https://ecommerce-cms.vercel.app/subscription'}>Renew now</a></p>
//               </div>
//               <div class="footer">
//                   <p>&copy; 2024 E-commerce CMS. All rights reserved.</p>
//               </div>
//           </div>
//       </body>
//       </html>

//       `,
//     );
//   });
// });

// // delete read notifications after 30 days.
// cron.schedule('0 0 0 * * *', async () => {
//   const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

//   await Notification.deleteMany({
//     status: 'read',
//     createdAt: { $lt: thirtyDaysAgo },
//   });
// });

// export const Scheduler = cron;
