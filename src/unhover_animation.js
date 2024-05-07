this.setState(
  { normalPlus: 0 },
  {
    duration: 1000,
    curve: "easeOutQuint",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { innerStrokeScaleX: 1 },
  {
    duration: 600,
    curve: "easeInOutCubic",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { innerStrokeScaleY: 1 },
  {
    duration: 600,
    curve: "easeInOutCubic",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { diamondScaleX: 2 },
  {
    duration: 600,
    curve: "easeInOutCubic",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { diamondScaleY: 2 },
  {
    duration: 600,
    curve: "easeInOutCubic",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { emission1ScaleX: 0.8 },
  {
    duration: 0,
    curve: "linear",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { emission1ScaleY: 0.8 },
  {
    duration: 0,
    curve: "linear",
    queued: false,
    onComplete: function() {}
  }
);

this.setState(
  { emission1Opacity: 1 },
  {
    duration: 0,
    curve: "linear",
    queued: false,
    onComplete: function() {}
  }
);
