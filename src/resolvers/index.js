import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
import { computeTriage } from '../triage.js';

const resolver = new Resolver();

function adfToText(adf) {
  if (!adf) return '';
  if (typeof adf === 'string') return adf;
  if (Array.isArray(adf.content)) return adf.content.map(adfToText).join(' ');
  if (typeof adf.text === 'string') return adf.text;
  return '';
}

resolver.define('getTriage', async (req) => {
  const issueKey = req.payload && req.payload.issueKey;
  if (!issueKey) throw new Error('issueKey is required');

  const res = await api.asUser().requestJira(
    route`/rest/api/3/issue/${issueKey}?fields=summary,description,priority,status,assignee,duedate,issuetype,created`
  );
  if (!res.ok) throw new Error(`Jira request failed: ${res.status}`);
  const issue = await res.json();
  const f = issue.fields || {};

  return {
    key: issue.key,
    summary: f.summary || '',
    triage: computeTriage({
      summary: f.summary || '',
      description: adfToText(f.description),
      priority: f.priority,
      status: f.status,
      assignee: f.assignee,
      duedate: f.duedate,
      created: f.created,
    }),
  };
});

export const handler = resolver.getDefinitions();
