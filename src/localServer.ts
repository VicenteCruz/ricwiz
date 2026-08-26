import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { fetchJiraIssuesBatch } from './jiraApi';

let server: http.Server | undefined;

export function startLocalServer() {
    if (server) return;

    server = http.createServer(async (req, res) => {
        try {
            const url = new URL(req.url || '', `http://${req.headers.host}`);
            
            if (url.pathname === '/tickets_batch' && req.method === 'GET') {
                const idsParam = url.searchParams.get('ids');
                if (!idsParam) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ error: 'Missing ids parameter' }));
                }

                const ticketIds = idsParam.split(',').map(id => id.trim()).filter(Boolean);
                const data = await fetchJiraIssuesBatch(ticketIds);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(data));
            }

            res.writeHead(404);
            res.end();
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message || 'Internal error' }));
        }
    });

    // Listen on localhost on a random available port
    server.listen(0, '127.0.0.1', () => {
        const address = server?.address();
        if (address && typeof address !== 'string') {
            setupCliEnvironment(address.port);
        }
    });
}

function setupCliEnvironment(port: number) {
    const ricwizDir = path.join(os.homedir(), '.ricwiz');
    if (!fs.existsSync(ricwizDir)) {
        fs.mkdirSync(ricwizDir, { recursive: true });
    }

    // Write the port file so the CLI knows where to connect
    fs.writeFileSync(path.join(ricwizDir, 'port.txt'), port.toString(), 'utf8');

    // Write the CLI script dynamically
    const cliScript = `
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const portFile = path.join(os.homedir(), '.ricwiz', 'port.txt');
if (!fs.existsSync(portFile)) {
    console.error('Ricwiz extension is not running (port.txt missing).');
    process.exit(1);
}

const port = fs.readFileSync(portFile, 'utf8').trim();
const ids = process.argv.slice(2).join(',');

if (!ids) {
    console.error('Please provide at least one Jira ticket ID.');
    process.exit(1);
}

const options = {
    hostname: '127.0.0.1',
    port: parseInt(port, 10),
    path: '/tickets_batch?ids=' + encodeURIComponent(ids),
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error('Error fetching tickets:', data);
            process.exit(1);
        }
        console.log(data); // Print the raw JSON output for the agent
    });
});

req.on('error', (e) => {
    console.error('Failed to connect to Ricwiz extension. Is VS Code open?', e.message);
    process.exit(1);
});

req.end();
`;;

    fs.writeFileSync(path.join(ricwizDir, 'jira-cli.js'), cliScript.trim(), 'utf8');
}

export function stopLocalServer() {
    if (server) {
        server.close();
        server = undefined;
    }
}
