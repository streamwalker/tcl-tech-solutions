

# Agent Chat Persistence

Store the agent conversation in a React context at the `PlatformLayout` level so it survives navigation between platform pages.

## Approach

1. **Create `AgentContext`** (`src/components/platform/AgentContext.tsx`)
   - React context holding `messages`, `setMessages`, `clearMessages`
   - Also persists to `localStorage` on every message change and rehydrates on mount
   - Key: `tcl-agent-history`

2. **Wrap in PlatformLayout**
   - Import `AgentProvider` and wrap the layout content

3. **Update AgentPanel**
   - Replace local `useState<Msg[]>([])` with `useAgentContext()`
   - Add a "Clear chat" button in the header

This keeps conversation alive across route changes within `/platform/*` and even across page refreshes via localStorage.

