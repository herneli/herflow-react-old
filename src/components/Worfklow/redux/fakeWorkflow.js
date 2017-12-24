import ActivityType from '../ActivityType';

let Workflow = {
  name: "Workflow de test",
  mainActivity: {
    _id: 1,
    isMain: true,
    type: ActivityType.Sequence,
    childrenActivities: [
      {
        _id: 2,
        name: "Inicio",
        type: ActivityType.Initial
      },
      {
        _id: 3,
        name: "Change NODES",
        type: ActivityType.Task
      },
      {
        _id: 4,
        name: "Varias",
        type: ActivityType.Parallel,
        childrenActivities: [
          {
            _id: 41,
            name: "Seq 1",
            label: "Etiqueta 1",
            type: ActivityType.Sequence,
            childrenActivities: [
              {
                _id: 411,
                name: "Tarea 1",
                type: ActivityType.Task
              }
            ]
          },
          {
            _id: 42,
            name: "Seq 2",
            label: "Etiqueta 2",
            type: ActivityType.Sequence,
            childrenActivities: [
              {
                _id: 421,
                name: "Tarea 1",
                type: ActivityType.Task
              }
            ]
          },
          {
            _id: 43,
            name: "Seq 2",
            label: "Etiqueta 2",
            type: ActivityType.Sequence,
            childrenActivities: [
              {
                _id: 431,
                name: "Tarea 3",
                type: ActivityType.Parallel,
                childrenActivities: [
                  {
                    _id: 4311,
                    name: "Sequence",
                    label: "Branch 1 with a very very long label that should be broken",
                    type: ActivityType.Sequence,
                    childrenActivities: [
                      {
                        _id: 43111,
                        name: "Tarea 1",
                        type: ActivityType.Task
                      },
                      {
                        _id: 43112,
                        name: "Tarea 1",
                        type: ActivityType.Task
                      }
                    ]
                  },
                  {
                    _id: 4312,
                    name: "Sequence",
                    label: "Branch 2",
                    type: ActivityType.Sequence,
                    childrenActivities: [
                      {
                        _id: 43121,
                        name: "Tarea 1",
                        type: ActivityType.Task
                      }
                    ]
                  },
                  {
                    _id: 4313,
                    name: "Sequence",
                    label: "Branch 3",
                    type: ActivityType.Sequence,
                    childrenActivities: [
                      {
                        _id: 4313,
                        name: "Loop",
                        type: ActivityType.Loop,
                        childrenActivities: [
                          {
                            _id: 43131,
                            name: "Tarea 1",
                            label: "Test",
                            type: ActivityType.Sequence
                          }
                        ]
                      }
                    ]
                  }
                ]
              }]
          }
        ]
      },
      {
        _id: 5,
        name: "Final",
        type: ActivityType.Final
      }
    ]
  }
};

export default Workflow;