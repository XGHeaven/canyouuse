<div class="search-bar">
  <div class="input-box">
    <div class="search-text">Can I use</div>
    <input type="text" class="input" />
    <div class="search-text">?</div>
  </div>
</div>

<style>
  .search-bar {
    background: #c75000;
    padding: 16px;
  }

  .input-box {
    color: white;
    font-size: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .search-text {
    flex: none;
  }

  .input {
    width: 320px;
    margin: 0 16px;
    line-height: 1.3;
    font-size: 28px;
    text-align: center;
    outline: none;
    background: inherit;
    color: inherit;
    border: none;
    border-bottom: 1px solid white;
  }

  .input:focus {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
