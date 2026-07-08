let modalScrollLockCount = 0;

export function isArcModalScrollLockActive(): boolean {
  return modalScrollLockCount > 0;
}

export function beginArcModalScrollLock(): void {
  modalScrollLockCount += 1;
}

export function endArcModalScrollLock(): void {
  modalScrollLockCount = Math.max(0, modalScrollLockCount - 1);
}
