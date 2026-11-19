import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Box, Button, Heading, Lozenge, Stack, Text } from '@forge/react';
import { invoke, view } from '@forge/bridge';

const levelAppearance = {
  Urgent: 'removed',
  High: 'moved',
  Medium: 'new',
  Low: 'default',
};

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const context = await view.getContext();
      const issueKey = context?.extension?.issue?.key;
      if (!issueKey) throw new Error('Tidak bisa membaca issue saat ini.');
      const result = await invoke('getTriage', { issueKey });
      setData(result);
    } catch (e) {
      setError(e && e.message ? e.message : 'Gagal memuat triage.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Text>Memeriksa issue…</Text>;
  if (error) {
    return (
      <Stack space="space.200">
        <Heading size="medium">TriageLens</Heading>
        <Text>{error}</Text>
        <Button onClick={load}>Coba lagi</Button>
      </Stack>
    );
  }

  const t = data.triage;
  return (
    <Stack space="space.200">
      <Heading size="medium">TriageLens</Heading>
      <Text>{data.key}: {data.summary}</Text>
      <Box>
        <Text>Skor triage: {t.score} / 100</Text>
      </Box>
      <Lozenge appearance={levelAppearance[t.level] || 'default'}>
        {t.level} — saran prioritas: {t.suggestedPriority}
      </Lozenge>
      <Text>Prioritas saat ini: {t.currentPriority} • Status: {t.status}</Text>
      <Heading size="small">Checklist</Heading>
      {t.checks.map((c) => (
        <Text key={c.label}>{c.ok ? '✅' : '⚠️'} {c.label} — {c.detail}</Text>
      ))}
      <Heading size="small">Kenapa skor ini?</Heading>
      {t.reasons.map((r) => (
        <Text key={r}>• {r}</Text>
      ))}
      <Heading size="small">Langkah berikutnya</Heading>
      <Text>{t.nextAction}</Text>
      <Button onClick={load}>Periksa ulang</Button>
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
