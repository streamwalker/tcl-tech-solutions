"""Derive the five-level tower from the preserved original exported GLB."""
import json
import struct
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / 'public/tower.glb'
destination = root / 'public/tower-five-levels.glb'
raw = source.read_bytes()
json_length, _ = struct.unpack_from('<II', raw, 12)
model = json.loads(raw[20:20 + json_length])
# Keep the original binary geometry intact, pruning unused nodes/meshes in JSON.
binary_chunks = raw[20 + json_length:]
removed = {i for i, node in enumerate(model['nodes'])
           if node.get('name', '').startswith(('Armor_', 'Floor_5_'))}
node_map = {old: new for new, old in enumerate(i for i in range(len(model['nodes'])) if i not in removed)}
model['nodes'] = [node for i, node in enumerate(model['nodes']) if i not in removed]
for node in model['nodes']:
    if 'children' in node:
        node['children'] = [node_map[i] for i in node['children'] if i not in removed]
    name = node.get('name', '')
    if name.startswith('Elevator_spine'):
        node['translation'][1] = -12.2
        # Original spines span 36.2 m. Removing one 6.1 m floor leaves 30.1 m.
        node['scale'] = [1, 30.1 / 36.2, 1]
    elif name == 'Foundation':
        node['translation'][1] += 6.1
for scene in model['scenes']:
    scene['nodes'] = [node_map[i] for i in scene['nodes'] if i not in removed]
animations = []
for animation in model.get('animations', []):
    channels = [channel for channel in animation['channels'] if channel['target'].get('node') not in removed]
    if not channels:
        continue
    for channel in channels:
        if 'node' in channel['target']:
            channel['target']['node'] = node_map[channel['target']['node']]
    animation['channels'] = channels
    animations.append(animation)
model['animations'] = animations
used_meshes = sorted({node['mesh'] for node in model['nodes'] if 'mesh' in node})
mesh_map = {old: new for new, old in enumerate(used_meshes)}
model['meshes'] = [model['meshes'][i] for i in used_meshes]
for node in model['nodes']:
    if 'mesh' in node:
        node['mesh'] = mesh_map[node['mesh']]
encoded = json.dumps(model, separators=(',', ':')).encode()
encoded += b' ' * (-len(encoded) % 4)
result = struct.pack('<III', 0x46546C67, 2, 20 + len(encoded) + len(binary_chunks))
result += struct.pack('<II', len(encoded), 0x4E4F534A) + encoded + binary_chunks
destination.write_bytes(result)
print(f'{destination.name}: {len(model["nodes"])} nodes, {len(animations)} animations, five floors')
