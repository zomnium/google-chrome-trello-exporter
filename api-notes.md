

# JSON outline

- name
- labelNames[]
    - red
    - orange
    - yellow
    - green
    - blue
    - purple
- lists[]
    - id
    - name
    - closed?
    - pos
- checklists[]
    - idBoard
    - idCard
    - pos
    - checkItems[]
        - state (incomplete/complete)
        - name
        - pos
- cards[]
    - checkItemStates[]?
        - idCheckItem
        - state (incomplete/complete)
    - closed?
    - desc
    - idBoard
    - idList
    - name
    - pos
    - idChecklists[]?
    - idMembers[]?
    - labels[]
        - color
        - name
    - shortUrl?


# Export formats

boardname


listname


cardname
labels
desc

checklist
item    state


etc.


# Export types

- CSV
- Excel (by using a library)
