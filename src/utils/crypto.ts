import CryptoJS from 'crypto-js';
import type { AuditLog } from './types';

export function sha256(data: string): string {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

export function createBlock(
  patientId: string,
  patientName: string,
  actorId: string,
  actorName: string,
  actorRole: 'patient' | 'doctor' | 'government' | 'admin',
  action: string,
  accessReason: string,
  details: string,
  previousHash: string,
  hospitalName?: string
): AuditLog {
  const timestamp = new Date().toISOString();
  const blockData = `${patientId}|${actorId}|${action}|${timestamp}|${previousHash}`;
  const blockchainHash = sha256(blockData);

  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    patientId,
    patientName,
    actorId,
    actorName,
    actorRole,
    action,
    timestamp,
    blockchainHash,
    previousHash,
    isTampered: false,
    accessReason,
    details,
    hospitalName,
  };
}

export function verifyChain(logs: AuditLog[]): { valid: boolean; tamperedIndex: number } {
  for (let i = 1; i < logs.length; i++) {
    const prevLog = logs[i - 1];
    if (logs[i].previousHash !== prevLog.blockchainHash) {
      return { valid: false, tamperedIndex: i };
    }
    // Verify hash integrity
    const expectedHash = sha256(
      `${prevLog.patientId}|${prevLog.actorId}|${prevLog.action}|${prevLog.timestamp}|${prevLog.previousHash}`
    );
    if (prevLog.blockchainHash !== expectedHash && !prevLog.isTampered) {
      return { valid: false, tamperedIndex: i - 1 };
    }
  }
  return { valid: true, tamperedIndex: -1 };
}

export function getLastHash(logs: AuditLog[]): string {
  if (logs.length === 0) return '0'.repeat(64);
  return logs[logs.length - 1].blockchainHash;
}
