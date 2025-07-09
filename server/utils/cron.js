import cron from 'node-cron';
import axios from 'axios';

/**
 * Initializes a cron job that pings the server's health check endpoint.
 * This works for both local development and production environments.
 * @param {number|string} port - The port the server is running on.
 */
function initializeCronJobs(port) {
    // For testing, use '* * * * *' (every minute).
    // For production, use '*/14 * * * *' (every 14 minutes).
    const cronSchedule = process.env.NODE_ENV === 'production' ? '* * * * *' : '* * * * *';

    cron.schedule(cronSchedule, async () => {
        const jobStartTime = new Date().toISOString();
        console.log(`[CRON] Running health check job at: ${jobStartTime}`);

        try {
            let baseUrl;

            // Check the environment to determine the correct URL
            if (process.env.NODE_ENV === 'production') {
                // In production, use the Render URL
                baseUrl = process.env.RENDER_EXTERNAL_URL;
            } else {
                // In development, use the local server's URL
                baseUrl = `http://localhost:${port}`;
            }

            if (!baseUrl) {
                console.error("[CRON] Error: Base URL for health check is not defined. Skipping job.");
                return;
            }

            const healthCheckUrl = `${baseUrl}/api/health`;
            console.log(`[CRON] Pinging: ${healthCheckUrl}`); // Log the URL we're about to hit

            const response = await axios.get(healthCheckUrl);

            console.log(`[CRON] Health check successful. Status: ${response.status}`);
            console.log(`[CRON] Response data:`, response.data);

        } catch (error) {
            console.error('[CRON] Error during health check:', error.message);
            if (error.response) {
                console.error(`[CRON] Status: ${error.response.status}`);
                console.error(`[CRON] Data:`, error.response.data);
            }
        }
    });

    console.log(`✅ Cron health check job initialized. Schedule: [${cronSchedule}]`);
}

export default initializeCronJobs;