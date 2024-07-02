import numpy as np
import torch

dev = torch.device("cuda" if torch.cuda.is_available() else "cpu")

name2idx = {'spatter': 1, 'undercut': 2}
idx2name = {v: k for k, v in name2idx.items() }

np.random.seed(1)
class_to_color = {name2idx[v]: np.random.randint(0, 255, 3) for v in name2idx}

to_name = np.vectorize(lambda x: idx2name[x])
